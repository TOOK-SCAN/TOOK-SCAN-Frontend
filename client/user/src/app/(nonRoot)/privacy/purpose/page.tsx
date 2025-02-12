const Agreement1 = () => {
  return (
    <div className="flex flex-col justify-start gap-6">
      {/* 첫 번째 글 상자 */}
      <div className="flex items-center justify-start">
        <div>
          <h2 className="mb-4 font-bold text-black h3">
            개인정보 수집목적 및 이용목적
          </h2>
          <p className="text-gray-700 body2">
            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등
            필요한 조치를 이행할 예정입니다.
          </p>
        </div>
      </div>

      {/* 두 번째 글 상자 */}
      <div className="flex items-center justify-start">
        <div>
          <ul className="list-decimal pl-6 text-gray-700 body2">
            <li className="mb-2">
              홈페이지 회원 가입 및 관리
              <p className="text-gray-600">
                회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증,
                회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 가입
                및 가입횟수 제한, 서비스 부정 이용 방지, 비회원 주문 및
                식별·인증, 14세 이상 연령 확인, 각종 고지·통지, 고충 처리를
                목적으로 개인정보를 처리합니다.
              </p>
            </li>
            <li className="mb-2">
              서비스 제공
              <p className="text-gray-600">
                물품 배송, 서비스 제공, 계약서 및 청구서 발송, 콘텐츠 제공,
                맞춤서비스 제공, 본인인증, 연령인증, 요금 결제 및 정산, 비회원
                주문조회를 목적으로 개인정보를 처리합니다.
              </p>
            </li>
            <li className="mb-2">
              고충 처리
              <p className="text-gray-600">
                민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지,
                처리 결과 통보의 목적으로 개인정보를 처리합니다.
              </p>
            </li>
            <li>
              마케팅 (선택사항)
              <p className="text-gray-600">
                이벤트 정보제공, 광고 정보제공, 마케팅 활용 목적으로 개인정보를
                처리합니다.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Agreement1
