import SectionTitle from '../components/ui/SectionTitle.jsx'

export default function Info() {
  return (
    <div className="page-container pb-24">
      <div className="page-content">
        <SectionTitle subtitle="Інформація">Про компанію</SectionTitle>

        <div className="max-w-3xl mx-auto space-y-12">
          <section className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-light-100">Контакти</h3>
            <div className="glass rounded-lg p-6 space-y-3 text-sm text-light-200 leading-relaxed">
              <p><span className="text-gold-400">Ел. пошта:</span> ludmilakolisnik27@gmail.com</p>
              <p><span className="text-gold-400">Телефон:</span> 380976268148</p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-light-100">Реквізити</h3>
            <div className="glass rounded-lg p-6 space-y-3 text-sm text-light-200 leading-relaxed">
              <p>ФОП Козлов Володимир Михайлович</p>
              <p><span className="text-gold-400">ІПН / ЄДРПОУ:</span> 3148801837</p>
              <p><span className="text-gold-400">Юридична адреса:</span> 1A, vul. Sahaidachnoho, Ternopil, 46002</p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-light-100">Способи оплати</h3>
            <div className="glass rounded-lg p-6 text-sm text-light-200 leading-relaxed space-y-4">
              <p>Банківською карткою</p>
              <p>
                Для вибору оплати товару за допомогою банківської картки на відповідній сторінці необхідно натиснути кнопку «Оплата замовлення банківською карткою». Оплата відбувається через систему liqpay з використанням Банківських карток наступних платіжних систем:
              </p>
              <p>Visa, Mastercard</p>

              <h4 className="font-bold text-light-100 pt-2">Опис процесу передачі даних</h4>
              <p>
                Для оплати (введення реквізитів Вашої картки) Ви будете перенаправлені на платіжний шлюз системи liqpay. З'єднання з платіжним шлюзом і передача інформації здійснюється в захищеному режимі з використанням протоколу шифрування SSL. У разі якщо Ваш банк підтримує технологію безпечного проведення інтернет-платежів Verified By Visa або MasterCard SecureCode для проведення платежу також може знадобитися введення спеціального пароля. Справжній сайт підтримує 256-бітове шифрування. Конфіденційність повідомленої персональної інформації забезпечується системою liqpay. Введена інформація не буде надана третім особам за винятком випадків, передбачених законодавством України. Проведення платежів за банківськими картками здійснюється в суворій відповідності з вимогами платіжних систем Visa Int. и MasterCard Europe Sprl.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-light-100">Повернення переказаних коштів</h3>
            <div className="glass rounded-lg p-6 text-sm text-light-200 leading-relaxed space-y-3">
              <p>
                Повернення переказаних коштів проводиться на Ваш банківський рахунок протягом 5 – 30 робочих днів (термін залежить від Банку, який видав Вашу банківську карту).
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-light-100">Повернення товару</h3>
            <div className="glass rounded-lg p-6 text-sm text-light-200 leading-relaxed space-y-3">
              <p>
                Відмова від товару можлива в момент отримання і при умові неналежної якості його. Повернення переказаних коштів проводиться на Ваш банківський рахунок протягом 5 – 30 робочих днів (термін залежить від Банку, який видав Вашу банківську карту).
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
