import { useLang } from '../i18n/context.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'

const uk = {
  subtitle: 'Користувацька угода',
  title: 'Умови користування',
  intro: [
    'Цей документ «Користувацька угода» являє собою пропозицію ФОП Козлов Володимир Михайлович укласти договір на викладених нижче умовах.',
    'the-river.choiceqr.com — це сайт, розташований за адресою https://the-river.choiceqr.com, створений та діючий з метою реалізації (продажу) покупцям (фізичним та юридичним особам) товарів, наданих на сайті, що перебувають у власності ФОП Козлов Володимир Михайлович до моменту їх реалізації покупцям.',
    'ФОП Козлов Володимир Михайлович є юридичною особою, зареєстрованою відповідно до чинного законодавства України, що здійснює продаж товарів дистанційним способом (за допомогою Інтернет-магазину на сайті the-river.choiceqr.com).',
    'Замовлення товарів дистанційним способом за допомогою Інтернет-магазину the-river.choiceqr.com дозволяє користувачам зазначеного Сайту (реальним та/або потенційним покупцям) знайти опис необхідного товару (включаючи його технічні характеристики, вартість, діючі акції, адресу, умови реалізації, а також іншу інформацію, що є обов\'язковою при дистанційній формі реалізації товарів) та гарантовано придбати у продавця ФОП Козлов Володимир Михайлович обраний товар.',
    'Ця угода регулює відносини, що виникають між ФОП Козлов Володимир Михайлович в мережі Інтернет, розташованого за адресою the-river.choiceqr.com, і будь-яким користувачем зазначеного сайту — фізичною або юридичною особою, яка виступає як відвідувач сайту або покупець у Продавця товарів, розміщених на сайті.',
  ],
  conceptsTitle: 'Основні поняття',
  concepts: [
    ['Сайт', 'Інтернет-сайт, що належить Продавцю, розташований в мережі Інтернет за адресою the-river.choiceqr.com, де представлені Товари, пропоновані Продавцем для придбання, а також умови оплати та доставки Товарів Покупцям. Сайт є Інтернет-магазином Продавця.'],
    ['Продавець', 'ФОП Козлов Володимир Михайлович (ІПН/ЄДРПОУ: 3148801837), що здійснює продаж Товарів, представлених на Сайті, за допомогою дистанційної торгівлі.'],
    ['Сервіс', 'Комплекс послуг, що надаються користувачеві з використання Сайту в інформаційних цілях, для отримання Контенту, а також з метою ознайомлення з Товарами.'],
    ['Товар', 'Хлібобулочні вироби, плоди та овочі, кондитерські, винно-горілчані, безалкогольні напої, молочно-олійні, м\'ясні та ковбасні вироби, рибні, яєчні, харчові жири, тютюнові вироби.'],
    ['Контент', 'Текстові, графічні зображення, аудіо- та відеоматеріали, інформація та повідомлення будь-якого характеру, розміщена ФОП Козлов Володимир Михайлович на Сайті.'],
    ['Користувач', 'Дієздатна фізична особа, яка приймає умови цієї Угоди та пройшла процедуру реєстрації на Сайті у власному інтересі або виступає від імені та в інтересах представленої ним юридичної особи.'],
    ['Покупець', 'Користувач, який розмістив Замовлення на Сайті на придбання Товару, зазначеного на Сайті та присутнього у Продавця в наявності.'],
    ['Реєстрація Користувача на Сайті', 'Процес створення Користувачем власного Облікового запису шляхом заповнення на Сайті спеціальних форм.'],
    ['Обліковий запис Користувача', 'Сукупність інформації про користувача відповідно до запропонованих Продавцем до заповнення полів на Сайті, яка дозволяє однозначно ідентифікувати користувача в процесі використання ним Сайту.'],
    ['Замовлення', 'Належним чином оформлений запит Покупця на придбання Товарів, обраних на Сайті та наявних у наявності у Продавця, а також на їх доставку за вказаною Покупцем адресою на умовах, зазначених на Сайті у розділі «Оплата і доставка».'],
  ],
  sections: [
    { number: '1', title: 'Предмет угоди користувача', items: [
      '1.1 Предметом цієї угоди є надання можливості користувачеві отримувати Сервіси Сайту, отримувати Контент Сайту, а також купувати для особистих, сімейних, домашніх та інших потреб, а також для потреб, пов\'язаних зі здійсненням підприємницької діяльності, Товари, представлені в каталозі Сайту за адресою https://the-river.choiceqr.com, а також будь-який розвиток та/або додавання нових сервісів, Товарів та послуг.',
      '1.2 Ця угода поширюється на всі Сервіси, Товари, послуги, представлені на Сайті.',
      '1.3 Обов\'язковою умовою використання Сайту його Сервісів є повне і беззастережне прийняття користувачем умов таких документів: даної угоди користувача; Політики конфіденційності. Замовлення Товару у Продавця будь-яким способом (за допомогою сервісів Сайту, телефоном або особисто) означає згоду Користувача/Покупця з усіма умовами цієї угоди Користувача.',
      '1.4 У разі незгоди з цією Угодою Користувач зобов\'язаний припинити використання Сайту і його Сервісів і покинути Сайт.',
      '1.5 Продавець за допомогою Сервісів Сайту надає користувачам: інформаційні послуги за допомогою публікації товарів, що реалізуються власне Продавцем через Інтернет-ресурс https://the-river.choiceqr.com, а саме: фотографій товарів, їх вартості, наявність або відсутність на складі Продавця, діючих акціях на товар або групу товарів, умовах замовлення товарів та їх доставки, контактної та іншої необхідної інформації про товари та про Продавця; послуги з придбання товарів, інформація про які представлена на сайті https://the-river.choiceqr.com та наявних, а саме: можливість зробити замовлення обраного товару безпосередньо на сайті, а також за вказаним телефоном усно диспетчеру Продавця; отримати замовлений товар (товари) в узгоджені з Продавцем терміни за вказаною Покупцем адресою з комплектом супровідних документів, передбачених чинним законодавством України.',
      '1.6 Користувач прямо погоджується з тим, що використовує Сайт і будь-яку розміщену на сайті інформацію на свій власний ризик.',
      '1.7 Умови цієї Угоди користувача приймаються Користувачем під час реєстрації в порядку, передбаченому Сайтом і цією Угодою користувача, а також у разі замовлення Товару у Продавця будь-яким можливим способом.',
      '1.8 Угода користувача діє весь час використання Користувачем Сервісів Сайту та/або весь час замовлення Покупцем Товарів у Продавця.',
      '1.9 Угода користувача може бути змінена Продавцем у будь-який момент і без будь-якого попереднього повідомлення користувача. Нова версія Угоди користувача набирає чинності з моменту її розміщення на Сайті, якщо інше не передбачено новою редакцією Угоди користувача.',
      '1.10 Найбільш актуальна версія Угоди користувача завжди знаходиться на сторінці за адресою: https://the-river.choiceqr.com/terms-of-use',
    ]},
    { number: '2', title: 'Реєстрація на Сайті', items: [
      '2.1 Реєстрація на Сайті є обов\'язковою для оформлення Замовлення. При оформленні замовлення за телефоном користувач також проходить Реєстрацію на Сайті за допомогою співробітника Продавця.',
      '2.2 Під час реєстрації користувач зобов\'язується надавати про себе тільки достовірну, точну і повну інформацію про себе з питань, пропонованих у реєстраційній формі та підтримувати цю інформацію в актуальному стані.',
      '2.3 Під час реєстрації на Сайті Користувач надає наступну інформацію: прізвище, ім\'я, адресу електронної пошти, контактний телефон.',
      '2.4 Інформація про користувача, що міститься в обліковому записі Користувача, зберігається та обробляється Продавцем відповідно до Політики конфіденційності.',
      '2.5 Користувач зобов\'язується негайно повідомити Продавця про будь-який випадок несанкціонованого використання його Облікового запису.',
      '2.6 Користувач зобов\'язується не передавати іншим особам свої персональні дані, отримані під час реєстрації (логін і пароль) для входу/ідентифікації на Сайт, і несе повну відповідальність за втрату, зникнення або передачу іншими способами персональних даних.',
    ]},
    { number: '3', title: 'Умови оформлення Замовлення та продажу Товарів', items: [
      '3.1 Замовляючи Товари будь-яким способом, Користувач погоджується з умовами оформлення Замовлення та продажу Товарів, встановленими Продавцем.',
      '3.2 Умови продажу Товарів, а також інформація про Товари, представлені на Сайті, є публічною офертою.',
      '3.3 Користувач погоджується з умовами оформлення Замовлення та продажу Товарів шляхом проставлення відмітки у графі «З даними умовами згоден» при реєстрації на Сайті та оформленні Замовлення.',
      '3.4 У більшості випадків кожна одиниця Товару, представлена на Сайті, супроводжується фотографією.',
      '3.5 Деякі (або всі) одиниці Товару можуть супроводжуватися описами та/або характеристиками Товару, які при цьому не претендують на вичерпну інформативність і можуть містити похибки.',
      '3.6 У переважній більшості випадків кожна одиниця Товару, представлена на Сайті, є в наявності у Продавця.',
      '3.7 У разі анулювання повністю або частково передплаченого Замовлення, вартість анульованого Товару повертається Продавцем Покупцю.',
      '3.8 Продавець вживає всіх можливих законних заходів для забезпечення на своєму складі всіх Товарів, поданих на Сайті.',
    ]},
    { number: '4', title: 'Доставка Замовлення', items: [
      '4.1 Способи та розцінки на доставку Товарів вказані на Сайті на сторінці оформлення замовлення на доставку.',
      '4.2 Доставка є окремою послугою Продавця. Доставка не є невід\'ємною частиною придбаного Покупцем Товару.',
      '4.3 Територія доставки Товарів, представлених на Сайті, обмежена межами України.',
    ]},
    { number: '5', title: 'Ціна Товару та умови оплати Замовлення', items: [
      '5.1 Всі розрахунки між Сторонами здійснюються в гривні.',
      '5.2 Ціна Товару зазначається на Сайті.',
      '5.3 Ціна Товару, поданого на Сайті, може бути змінена Продавцем в односторонньому порядку. При цьому ціна на замовлений Покупцем Товар зміні не підлягає.',
      '5.4 На окремі (або всі) найменування Товару Продавцем може бути встановлена знижка.',
      '5.5 Покупець оплачує Замовлення, обравши на власний розсуд та можливості один із способів оплати, зазначених на Сайті.',
    ]},
    { number: '6', title: 'Повернення Товару та грошових коштів', items: [
      '6.1 Повернення товару здійснюється відповідно до Закону України «Про захист прав споживачів».',
      '6.2 Повернення грошових коштів здійснюється за допомогою повернення вартості сплаченого Товару на банківську картку, поштовим переказом або готівкою в офісі компанії.',
    ]},
    { number: '7', title: 'Обмеження відповідальності Продавця', items: [
      '7.1 Продавець несе відповідальність перед користувачами за зміст та безпеку інформації, розміщеної на сайті.',
      '7.2 Продавець не несе відповідальності за наслідки застосування, використання або невикористання отриманої на сайті інформації.',
      '7.3 Продавець не несе перед Користувачем або третіми особами відповідальності за шкоду, збитки або витрати, що виникли у зв\'язку з використанням або невикористанням сайту.',
      '7.4 Користувач погоджується, що будь-яка інформація та зображення, розміщені на сайті, можуть бути використані Продавцем на власний розсуд.',
      '7.5 Продавець не несе жодних зобов\'язань щодо забезпечення конфіденційності щодо інформації, що надається його користувачами.',
    ]},
    { number: '8', title: 'Обмеження на використання сайту Користувачем', items: [
      '8.1 Під час використання сайту Користувач не має права копіювати і використовувати в комерційних цілях будь-яку інформацію.',
      '8.2 Користувач погоджується не відтворювати, не повторювати і не копіювати, не продавати і не перепродувати будь-які частини сайту для комерційних цілей.',
      '8.3 Користувач має право розірвати відносини з Продавцем і відмовитися від використання його сайту і сервісів.',
    ]},
    { number: '9', title: 'Права та обов\'язки користувача', items: [
      '9.1 Користувач проінформований та погоджується з тим, що відповідальність за доставку товару несе Продавець.',
      '9.2 Користувач (у тому числі є покупцем) зобов\'язаний передавати Продавцю інформацію про всі випадки виникнення конфліктних ситуацій.',
      '9.3 Будь-який користувач має право залишати відгуки про Товари, які розміщені на сайті.',
      '9.4 Користувач зобов\'язується не вживати дій, спрямованих на заподіяння шкоди програмній або апаратній частині сайту.',
    ]},
    { number: '10', title: 'Права та обов\'язки Продавця', items: [
      '10.1 Продавець гарантує збереження конфіденційності щодо даних про користувача.',
      '10.2 Продавець залишає за собою право припинити доступ до особистого кабінету та заблокувати реєстрацію без попереднього повідомлення Користувача.',
      '10.3 У разі порушення Користувачем умов цієї угоди Продавець має право призупинити співпрацю.',
      '10.4 Продавець самостійно визначає термін публікації відгуків користувача.',
      '10.5 Продавець має право не публікувати відкликання Користувача через невідповідність реальному досвіду.',
      '10.6 Продавець має право тимчасово призупинити роботу сайту з технічних причин.',
      '10.7 Продавець має право переуступати свої права та обов\'язки третім особам.',
    ]},
    { number: '11', title: 'Відповідальність користувача і Продавця', items: [
      '11.1 Продавець не несе відповідальності за шкоду, заподіяну Покупцю внаслідок неналежного використання Товарів.',
      '11.2 Продавець не несе відповідальності за відомості, надані користувачем на Сайті у загальнодоступній формі.',
      '11.3 Користувач погоджується з тим, що всі можливі суперечки з приводу цієї угоди вирішуватимуться за нормами Українського законодавства.',
      '11.4 Продавець не встановлює з користувачем агентських відносин, відносин товариства, відносин щодо спільної діяльності, відносин особистого найму.',
      '11.5 Бездіяльність з боку Продавця у разі порушення користувачем цієї угоди не означає сприяння Продавця.',
      '11.6 Сторони звільняються від відповідальності за порушення умов цієї угоди, якщо таке порушення викликане дією обставин непереборної сили (форс-мажор).',
    ]},
    { number: '12', title: 'Прикінцеві положення', items: [
      '12.1 До відносин між Користувачем (Покупцем) і Продавцем застосовуються положення чинного законодавства України.',
      '12.2 У разі виникнення питань і претензій з боку Користувача (Покупця) він повинен звернутися до Продавця за телефоном або іншим доступним способом.',
      '12.3 Визнання судом недійсності будь-якого положення цієї Угоди не тягне за собою недійсність інших положень.',
    ]},
  ],
  agreement_title: 'Згода користувача з цією Користувацькою угодою',
  agreement_text: 'Якщо користувач НЕ згоден з усіма вищевказаними умовами, він НЕ буде зареєстрований на Сайті Продавця за адресою https://the-river.choiceqr.com, не має права оформлювати замовлення та НЕ матиме можливості користуватися всіма сервісами зазначеного Сайту.',
}

const en = {
  subtitle: 'User Agreement',
  title: 'Terms of Use',
  intro: [
    'This document "User Agreement" constitutes an offer by FOP Kozlov Volodymyr Mykhailovych to enter into a contract on the terms set forth below.',
    'the-river.choiceqr.com is a website located at https://the-river.choiceqr.com, created and operating for the purpose of selling goods to customers (individuals and legal entities) presented on the site.',
    'FOP Kozlov Volodymyr Mykhailovych is a legal entity registered in accordance with the current legislation of Ukraine, carrying out remote sales of goods.',
    'Ordering goods remotely via the-river.choiceqr.com online store allows users to find descriptions of necessary goods and purchase them from the seller.',
    'This agreement governs the relations arising between FOP Kozlov Volodymyr Mykhailovych on the Internet and any user of the site.',
  ],
  conceptsTitle: 'Basic Concepts',
  concepts: [
    ['Site', 'An Internet site owned by the Seller, located at the-river.choiceqr.com, where Goods offered by the Seller for purchase are presented.'],
    ['Seller', 'FOP Kozlov Volodymyr Mykhailovych (Tax ID: 3148801837), who sells Goods presented on the Site through remote trading.'],
    ['Service', 'A set of services provided to the user for using the Site for informational purposes and for getting acquainted with the Goods.'],
    ['Goods', 'Bakery products, fruits and vegetables, confectionery, alcoholic beverages, soft drinks, dairy products, meat and sausage products, fish, eggs, edible fats, tobacco products.'],
    ['Content', 'Texts, graphic images, audio and video materials, information and messages of any nature posted by the Seller on the Site.'],
    ['User', 'A capable individual who accepts the terms of this Agreement and has registered on the Site.'],
    ['Buyer', 'A User who has placed an Order on the Site for the purchase of Goods.'],
    ['User Registration on the Site', 'The process of creating a User\'s own Account by filling out special forms on the Site.'],
    ['User Account', 'A set of information about the user that allows unambiguous identification of the user during their use of the Site.'],
    ['Order', 'A properly executed request from the Buyer to purchase Goods selected on the Site and available from the Seller.'],
  ],
  sections: [
    { number: '1', title: 'Subject of the User Agreement', items: [
      '1.1 The subject of this agreement is to provide the user with the opportunity to receive Site Services, Site Content, and also to purchase Goods presented in the Site catalog.',
      '1.2 This agreement applies to all Services, Goods, and services presented on the Site.',
      '1.3 A mandatory condition for using the Site and its Services is the full and unconditional acceptance by the user of the terms of this user agreement and the Privacy Policy.',
      '1.4 In case of disagreement with this Agreement, the User must stop using the Site and its Services.',
      '1.5 The Seller, through the Site Services, provides users with information services and services for purchasing goods.',
      '1.6 The User expressly agrees that they use the Site and any information posted on the site at their own risk.',
      '1.7 The terms of this User Agreement are accepted by the User during registration or when ordering Goods.',
      '1.8 The User Agreement is valid for the entire time the User uses the Site Services.',
      '1.9 The User Agreement may be changed by the Seller at any time without prior notice to the user.',
      '1.10 The most current version of the User Agreement is always available at https://the-river.choiceqr.com/terms-of-use.',
    ]},
    { number: '2', title: 'Registration on the Site', items: [
      '2.1 Registration on the Site is mandatory for placing an Order.',
      '2.2 During registration, the user undertakes to provide only reliable, accurate and complete information about themselves.',
      '2.3 During registration on the Site, the User provides the following information: last name, first name, email address, contact phone number.',
      '2.4 Information about the user contained in the User Account is stored and processed by the Seller in accordance with the Privacy Policy.',
      '2.5 The User undertakes to immediately notify the Seller of any case of unauthorized use of their Account.',
      '2.6 The User undertakes not to transfer their personal data received during registration to other persons.',
    ]},
    { number: '3', title: 'Terms of Order Placement and Sale of Goods', items: [
      '3.1 By ordering Goods in any way, the User agrees to the terms of placing an Order and selling Goods established by the Seller.',
      '3.2 The terms of sale of Goods, as well as information about the Goods presented on the Site, constitute a public offer.',
      '3.3 The User agrees to the terms by checking the appropriate box during registration.',
      '3.4 In most cases, each unit of Goods presented on the Site is accompanied by a photo.',
      '3.5 Descriptions of Goods do not claim to be exhaustive and may contain errors.',
      '3.6 In the vast majority of cases, each unit of Goods presented on the Site is available from the Seller.',
      '3.7 In case of cancellation of a prepaid Order, the cost of the cancelled Goods is returned to the Buyer.',
      '3.8 The Seller takes all possible legal measures to ensure availability of all Goods presented on the Site.',
    ]},
    { number: '4', title: 'Order Delivery', items: [
      '4.1 Methods and rates for delivery of Goods are indicated on the Site.',
      '4.2 Delivery is a separate service of the Seller.',
      '4.3 The territory of delivery of Goods presented on the Site is limited to Ukraine.',
    ]},
    { number: '5', title: 'Price of Goods and Terms of Payment', items: [
      '5.1 All settlements between the Parties are made in hryvnia.',
      '5.2 The price of the Goods is indicated on the Site.',
      '5.3 The price of the Goods presented on the Site may be changed by the Seller unilaterally.',
      '5.4 Discounts may be established by the Seller for individual items.',
      '5.5 The Buyer pays for the Order by choosing one of the payment methods indicated on the Site.',
    ]},
    { number: '6', title: 'Return of Goods and Refunds', items: [
      '6.1 Return of goods is carried out in accordance with the Law of Ukraine "On Consumer Protection".',
      '6.2 Refunds are made by returning the cost of the paid Goods to a bank card, postal transfer or cash at the company office.',
    ]},
    { number: '7', title: 'Limitation of Seller\'s Liability', items: [
      '7.1 The Seller is responsible to users for the content and security of information posted on the site.',
      '7.2 The Seller is not responsible for the consequences of using or not using the information received on the site.',
      '7.3 The Seller is not liable to the User or third parties for damages arising from the use or non-use of the site.',
      '7.4 The User agrees that any information and images posted on the site may be used by the Seller at their discretion.',
      '7.5 The Seller has no obligations regarding the confidentiality of information provided by its users.',
    ]},
    { number: '8', title: 'Restrictions on Site Use by the User', items: [
      '8.1 When using the site, the User has no right to copy and use any information for commercial purposes.',
      '8.2 The User agrees not to reproduce, copy, sell or resell any parts of the site for commercial purposes.',
      '8.3 The User has the right to terminate relations with the Seller and refuse to use the site and its services.',
    ]},
    { number: '9', title: 'User Rights and Obligations', items: [
      '9.1 The user is informed and agrees that the Seller is responsible for the delivery of goods.',
      '9.2 The user is obliged to inform the Seller about all cases of conflict situations.',
      '9.3 Any user has the right to leave reviews about the Goods posted on the site.',
      '9.4 The user undertakes not to take actions aimed at causing damage to the software or hardware of the site.',
    ]},
    { number: '10', title: 'Seller Rights and Obligations', items: [
      '10.1 The Seller guarantees the confidentiality of user data.',
      '10.2 The Seller reserves the right to terminate access to the personal account without prior notice to the User.',
      '10.3 In case of violation of the terms of this agreement by the User, the Seller has the right to suspend cooperation.',
      '10.4 The Seller independently determines the publication period of user reviews.',
      '10.5 The Seller has the right not to publish a User review due to inconsistency with the real experience.',
      '10.6 The Seller has the right to temporarily suspend the site for technical reasons.',
      '10.7 The Seller has the right to assign its rights and obligations to third parties.',
    ]},
    { number: '11', title: 'Liability of the User and Seller', items: [
      '11.1 The Seller is not responsible for damage caused to the Buyer as a result of improper use of the Goods.',
      '11.2 The Seller is not responsible for information provided by the user on the Site in a publicly available form.',
      '11.3 The User agrees that all possible disputes regarding this agreement will be resolved according to Ukrainian law.',
      '11.4 The Seller does not establish agency, partnership, joint activity, or personal employment relations with the user.',
      '11.5 Inaction by the Seller in case of violation by the user of this agreement does not mean encouragement by the Seller.',
      '11.6 The Parties are released from liability for violation of the terms of this agreement if such violation is caused by force majeure circumstances.',
    ]},
    { number: '12', title: 'Final Provisions', items: [
      '12.1 The relations between the User (Buyer) and the Seller are governed by the current legislation of Ukraine.',
      '12.2 If questions and claims arise from the User (Buyer), they must contact the Seller by phone or other available means.',
      '12.3 Recognition by a court of invalidity of any provision of this Agreement does not entail invalidity of other provisions.',
    ]},
  ],
  agreement_title: 'User\'s Consent to this User Agreement',
  agreement_text: 'If the user does NOT agree with all the above conditions, they will NOT be registered on the Seller\'s Site, do not have the right to place orders and will NOT be able to use all services of the said Site.',
}

function TermsSection({ number, title, children }) {
  return (
    <section className="space-y-4">
      <h3 className="font-display text-2xl font-bold text-cream-50">{number}. {title}</h3>
      <div className="glass rounded-lg p-6 space-y-3">
        {children}
      </div>
    </section>
  )
}

export default function Terms() {
  const { lang } = useLang()
  const d = lang === 'en' ? en : uk

  return (
    <div className="page-container pb-24">
      <div className="page-content">
        <SectionTitle subtitle={d.subtitle}>{d.title}</SectionTitle>

        <div className="max-w-3xl mx-auto space-y-10 text-sm text-gray-400 leading-relaxed">
          <div className="glass rounded-lg p-6 space-y-4">
            {d.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <SectionTitle subtitle="" />
          <div className="glass rounded-lg p-6 space-y-4">
            {d.concepts.map(([term, def], i) => (
              <p key={i}><strong className="text-gold-400">{term}</strong> — {def}</p>
            ))}
          </div>

          {d.sections.map((s) => (
            <TermsSection key={s.number} number={s.number} title={s.title}>
              {s.items.map((item, i) => <p key={i}>{item}</p>)}
            </TermsSection>
          ))}

          <div className="glass rounded-lg p-6 border border-gold-500/20 text-center">
            <h3 className="font-display text-2xl font-bold text-cream-50 mb-4">{d.agreement_title}</h3>
            <p className="text-gray-400">{d.agreement_text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
