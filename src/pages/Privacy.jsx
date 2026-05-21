import { useLang } from '../i18n/context.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'

const uk = {
  title: 'Політика конфіденційності',
  subtitle: 'Політика конфіденційності',
  intro: 'Справжній документ «Політика конфіденційності» (далі — «Політика») являє собою правила використання ФОП Козлов Володимир Михайлович персональної інформації користувача.',
  sections: [
    { number: '1', title: 'Загальні положення', items: [
      '1.1. Справжня Політика конфіденційності є невід\'ємною частиною Користувацької угоди (далі — «Угода»), розміщеної на Сайті, а також інших Договорів, що укладаються між Сторонами.',
      '1.2. Укладаючи Угоду, Користувач вільно, своєю волею і в своїх інтересах дає безстрокову письмову згоду на будь-які способи обробки своїх персональних даних.',
      '1.3. У цій Політиці конфіденційності використовуються терміни і визначення, передбачені Користувацькою Угодою.',
    ]},
    { number: '2', title: 'Особиста інформація', items: [
      '2.1. Під персональною інформацією в справжній Політиці розуміється:',
      '2.1.1. Інформація, яку користувач надає про себе самостійно при реєстрації на Сайті, включаючи персональні дані: Прізвище, Ім\'я, По батькові, контактний номер телефону, адреса електронної пошти, адреса доставки Товару.',
      '2.1.2. Дані, які передаються в автоматичному режимі: IP-адреса, cookie, дані про використовуване програмне забезпечення.',
      '2.2. Користувач усвідомлює та приймає можливість розміщення на сторінках Сайту програмного забезпечення третіх осіб.',
      '2.3. Користувач має право самостійно обмежити збір такої інформації третіми особами.',
      '2.4. Продавець має право встановлювати вимоги до складу Персональної інформації Користувача.',
      '2.5. Продавець не здійснює перевірку достовірності наданої Персональної інформації.',
    ]},
    { number: '3', title: 'Цілі обробки Персональної інформації', items: [
      '3.1. Продавець здійснює обробку лише тієї Персональної інформації, яка необхідна для укладення та виконання договорів з Користувачем.',
      '3.2. Продавець має право використовувати Персональну інформацію зокрема в таких цілях:',
      '• Укладання договорів на використання Сайту і Сервісів Сайту',
      '• Виконання зобов\'язань за укладеними договорами',
      '• Ідентифікація користувача в рамках виконання зобов\'язань',
      '• Проведення опитувань, контролю задоволеності користувача',
      '• Інформування Користувача про акції та пропозиції Продавця',
      '• Інформування користувача про замовлення та етапи його обробки',
      '• Забезпечення зв\'язку з користувачем з метою інформаційного обслуговування',
      '• Надання послуг з клієнтської підтримки користувачів',
      '• Використання знеособлених даних для таргетингу рекламних матеріалів',
      '• Проведення маркетингових, статистичних та інших досліджень',
    ]},
    { number: '4', title: 'Вимоги до захисту Персональної інформації', items: [
      '4.1. Продавець здійснює зберігання Персональної інформації та забезпечує її охорону від несанкціонованого доступу.',
      '4.2. Щодо Персональної інформації користувача зберігається її конфіденційність.',
      '4.3. Продавець має право передавати Персональну інформацію третім особам у таких випадках:',
      '• Користувач висловив свою згоду на такі дії',
      '• Передача необхідна в рамках використання користувачем функціональних можливостей Сайту',
      '• За запитом суду або іншого уповноваженого державного органу',
      '• Для захисту прав і законних інтересів Продавця',
    ]},
    { number: '5', title: 'Зміна Особистої інформації', items: [
      '5.1. Користувач має право в будь-який момент самостійно відредагувати у своєму Особистому кабінеті надану Персональну інформацію.',
      '5.2. Користувач має право на відкликання згоди на обробку його персональних даних.',
      '5.3. Продавець має право зберігати лог-файли про дії користувача протягом 6 місяців.',
    ]},
    { number: '6', title: 'Зміна Політики конфіденційності', items: [
      '6.1. Справжня Політика може бути змінена Продавцем в односторонньому порядку.',
      '6.2. Чинна редакція Політики знаходиться на Сайті Продавця.',
    ]},
  ],
}

const en = {
  title: 'Privacy Policy',
  subtitle: 'Privacy Policy',
  intro: 'This document "Privacy Policy" constitutes the rules for the use of personal information of the user by FOP Kozlov Volodymyr Mykhailovych.',
  sections: [
    { number: '1', title: 'General Provisions', items: [
      '1.1. This Privacy Policy is an integral part of the User Agreement posted on the Site.',
      '1.2. By entering into the Agreement, the User freely and voluntarily gives perpetual written consent to any methods of processing their personal data.',
      '1.3. This Privacy Policy uses the terms and definitions provided for in the User Agreement.',
    ]},
    { number: '2', title: 'Personal Information', items: [
      '2.1. Personal information in this Policy means:',
      '2.1.1. Information that the user provides independently when registering on the Site, including personal data: Last name, First name, Patronymic, contact phone number, email address, delivery address.',
      '2.1.2. Data transmitted automatically: IP address, cookies, software data.',
      '2.2. The user acknowledges and accepts the possibility of third-party software being placed on the Site.',
      '2.3. The user has the right to independently limit the collection of such information by third parties.',
      '2.4. The Seller has the right to establish requirements for the composition of the User\'s Personal Information.',
      '2.5. The Seller does not verify the accuracy of the provided Personal Information.',
    ]},
    { number: '3', title: 'Purposes of Processing Personal Information', items: [
      '3.1. The Seller processes only that Personal Information which is necessary for concluding and executing contracts with the User.',
      '3.2. The Seller has the right to use Personal Information for the following purposes:',
      '• Concluding contracts for the use of the Site and Site Services',
      '• Fulfilling obligations under concluded contracts',
      '• Identifying the user within the framework of fulfilling obligations',
      '• Conducting surveys, monitoring user satisfaction',
      '• Informing the User about promotions and offers of the Seller',
      '• Informing the user about orders and their processing stages',
      '• Ensuring communication with the user for information service purposes',
      '• Providing customer support services to users',
      '• Using anonymized data for targeting advertising materials',
      '• Conducting marketing, statistical and other research',
    ]},
    { number: '4', title: 'Requirements for Protection of Personal Information', items: [
      '4.1. The Seller stores Personal Information and ensures its protection from unauthorized access.',
      '4.2. The confidentiality of the User\'s Personal Information is maintained.',
      '4.3. The Seller has the right to transfer Personal Information to third parties in the following cases:',
      '• The user has expressed consent to such actions',
      '• Transfer is necessary for the user to use the Site functionality',
      '• Upon request of a court or other authorized state body',
      '• To protect the rights and legitimate interests of the Seller',
    ]},
    { number: '5', title: 'Change of Personal Information', items: [
      '5.1. The user has the right to independently edit the Personal Information provided during registration.',
      '5.2. The user has the right to withdraw consent to the processing of their personal data.',
      '5.3. The Seller has the right to store log files of user actions for 6 months.',
    ]},
    { number: '6', title: 'Changes to the Privacy Policy', items: [
      '6.1. This Policy may be changed by the Seller unilaterally.',
      '6.2. The current version of the Policy is on the Seller\'s Site.',
    ]},
  ],
}

function PrivacySection({ number, title, children }) {
  return (
    <section className="space-y-4">
      <h3 className="font-display text-2xl font-bold text-cream-50">{number}. {title}</h3>
      <div className="glass rounded-lg p-6 space-y-3">
        {children}
      </div>
    </section>
  )
}

export default function Privacy() {
  const { lang } = useLang()
  const d = lang === 'en' ? en : uk

  return (
    <div className="page-container pb-24">
      <div className="page-content">
        <SectionTitle subtitle={d.subtitle}>{d.title}</SectionTitle>

        <div className="max-w-3xl mx-auto space-y-10 text-sm text-gray-400 leading-relaxed">
          <div className="glass rounded-lg p-6">
            <p>{d.intro}</p>
          </div>

          {d.sections.map((s) => (
            <PrivacySection key={s.number} number={s.number} title={s.title}>
              {s.items.map((item, i) => (
                item.startsWith('•') ? (
                  <p key={i} className="pl-4">{item}</p>
                ) : (
                  <p key={i}>{item}</p>
                )
              ))}
            </PrivacySection>
          ))}
        </div>
      </div>
    </div>
  )
}
