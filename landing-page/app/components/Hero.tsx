'use client';

export default function Hero() {
  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta');
    ctaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f0e8] via-[#fefefe] to-[#f5f0e8] px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* 로고/브랜드명 */}
        <div className="mb-8 text-[#6f4e37] font-bold text-2xl tracking-wide">
          빈즐리
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#2d1f1a] mb-6 leading-tight">
          매일 마시는 커피,
          <br />
          이제 <span className="text-[#6f4e37]">딱 맞는 원두로</span>
        </h1>

        {/* 서브헤드라인 */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#5a4a42] mb-12 max-w-2xl mx-auto leading-relaxed">
          취향 맞춤 추천부터 배송까지
        </p>

        {/* CTA 버튼 */}
        <button
          onClick={scrollToCTA}
          className="inline-block bg-[#6f4e37] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#5a3d2a] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#c7a17a] focus:ring-opacity-50"
          aria-label="CTA 섹션으로 이동하여 알림 신청하기"
        >
          지금 시작하기
        </button>

        {/* 스크롤 힌트 (선택) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-[#6f4e37] opacity-50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}

