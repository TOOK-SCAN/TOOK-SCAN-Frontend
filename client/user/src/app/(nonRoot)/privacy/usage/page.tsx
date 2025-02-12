const Agreement4 = () => {
  return (
    <div className="flex w-full flex-col justify-start gap-6">
      <h2 className="mb-4 w-full font-bold text-black h3">
        서비스 이용과정에서 수집될 수 있는 정보
      </h2>
      <ul className="w-full list-disc space-y-2 pl-4 text-gray-700 body2">
        <li>이용자의 브라우저 종류 및 OS, 접속 IP 정보, 접속로그, 쿠키</li>
        <li>(모바일기기 이용 시) 단말기 정보, 단말 OS 정보</li>{' '}
        <li>구매/결제/취소/환불/상담 내역</li>
      </ul>
    </div>
  )
}
export default Agreement4
