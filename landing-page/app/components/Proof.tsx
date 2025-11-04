export default function Proof() {
  const testimonials = [
    {
      quote: "정말 취향에 딱 맞는 원두를 받았어요",
      author: "김○○"
    },
    {
      quote: "더 이상 원두 찾느라 헤매지 않아요",
      author: "이○○"
    },
    {
      quote: "매달 새로운 원두를 발견하는 재미가 있어요",
      author: "박○○"
    }
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f5f0e8] to-[#fefefe]">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 타이틀 */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#2d1f1a] mb-4">
          이미 많은 분들이
        </h2>
        <p className="text-xl sm:text-2xl text-center text-[#6f4e37] font-semibold mb-16">
          기다리고 있어요
        </p>

        {/* 후기 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              {/* 인용 부호 */}
              <div className="text-5xl text-[#c7a17a] mb-4 leading-none">&ldquo;</div>
              
              {/* 후기 내용 */}
              <p className="text-lg text-[#2d1f1a] mb-6 leading-relaxed flex-grow">
                {testimonial.quote}
              </p>
              
              {/* 작성자 */}
              <p className="text-[#6f4e37] font-semibold">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>

        {/* 통계 (선택) */}
        <div className="mt-16 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-[#6f4e37]">
            벌써 1,000명 이상이
          </p>
          <p className="text-lg sm:text-xl text-[#5a4a42] mt-2">
            런칭을 기다리고 있습니다
          </p>
        </div>
      </div>
    </section>
  );
}

