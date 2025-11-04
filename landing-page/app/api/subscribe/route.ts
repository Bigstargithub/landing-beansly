import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // 이메일 유효성 검사
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요' },
        { status: 400 }
      );
    }

    // 환경변수 확인
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Sheet1';

    if (!serviceAccountEmail || !privateKey || !sheetId) {
      console.error('Missing Google Sheets credentials');
      return NextResponse.json(
        { error: '서버 설정이 완료되지 않았습니다' },
        { status: 500 }
      );
    }

    // Google Sheets API 인증
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 현재 시간
    const timestamp = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });

    // 스프레드시트에 데이터 추가
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:B`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, timestamp]],
      },
    });

    return NextResponse.json(
      { success: true, message: '신청이 완료되었습니다!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Google Sheets API Error:', error);
    return NextResponse.json(
      { error: '데이터 저장 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

