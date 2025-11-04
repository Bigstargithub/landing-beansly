'use client';

import { useState, FormEvent } from 'react';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('올바른 이메일 주소를 입력해주세요');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('신청 완료! 곧 좋은 소식으로 찾아뵙겠습니다 ☕');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || '문제가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cta" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        {/* 헤드라인 */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d1f1a] mb-4">
          지금 신청하고 특별 혜택 받으세요
        </h2>
        
        {/* 서브헤드라인 */}
        <p className="text-lg sm:text-xl text-[#5a4a42] mb-12">
          런칭 소식과 얼리버드 혜택을 가장 먼저 받아보세요
        </p>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요"
              disabled={isSubmitting || status === 'success'}
              className="flex-1 px-6 py-4 rounded-full border-2 border-[#c7a17a] focus:border-[#6f4e37] focus:outline-none focus:ring-4 focus:ring-[#c7a17a] focus:ring-opacity-30 text-[#2d1f1a] placeholder-[#a89483] disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
              aria-label="이메일 주소"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting || status === 'success'}
              className="px-8 py-4 bg-[#6f4e37] text-white font-semibold rounded-full hover:bg-[#5a3d2a] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-[#c7a17a] focus:ring-opacity-50 whitespace-nowrap"
              aria-label="알림 신청하기"
            >
              {isSubmitting ? '처리중...' : status === 'success' ? '완료!' : '알림 신청하기'}
            </button>
          </div>

          {/* 상태 메시지 */}
          {message && (
            <div
              className={`p-4 rounded-lg mb-4 ${
                status === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          {/* 개인정보 안내 */}
          <p className="text-sm text-[#a89483] leading-relaxed">
            * 이메일은 런칭 알림 목적으로만 사용되며, 언제든 수신 거부할 수 있습니다
          </p>
        </form>
      </div>
    </section>
  );
}

