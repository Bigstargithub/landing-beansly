export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "3분 만에 찾는 나만의 원두",
      description: "간단한 질문으로 취향에 딱 맞는 원두를 추천받으세요"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "로스팅 24시간 내 배송",
      description: "갓 로스팅한 원두를 가장 신선한 상태로 받아보세요"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: "엄선된 원두만",
      description: "전문가가 직접 테스트한 고품질 원두만 제공합니다"
    }
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* 섹션 타이틀 */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#2d1f1a] mb-16">
          이렇게 달라집니다
        </h2>

        {/* Features 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#f5f0e8] hover:bg-[#ede5d8] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              {/* 아이콘 */}
              <div className="text-[#6f4e37] mb-6">
                {feature.icon}
              </div>

              {/* 타이틀 */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#2d1f1a] mb-4">
                {feature.title}
              </h3>

              {/* 설명 */}
              <p className="text-[#5a4a42] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

