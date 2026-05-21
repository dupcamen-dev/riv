import { useT } from '../i18n/context.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'

export default function Info() {
  const t = useT()
  return (
    <div className="page-container pb-24">
      <div className="page-content">
        <SectionTitle subtitle={t('info.subtitle')}>{t('info.title')}</SectionTitle>

        <div className="max-w-3xl mx-auto space-y-12">
          <section className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-cream-50">{t('info.contacts')}</h3>
            <div className="glass rounded-lg p-6 space-y-3 text-sm text-gray-400 leading-relaxed">
              <p><span className="text-gold-400">{t('info.email')}</span> ludmilakolisnik27@gmail.com</p>
              <p><span className="text-gold-400">{t('info.phone')}</span> 380976268148</p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-cream-50">{t('info.details')}</h3>
            <div className="glass rounded-lg p-6 space-y-3 text-sm text-gray-400 leading-relaxed">
              <p>{t('info.fop')}</p>
              <p><span className="text-gold-400">{t('info.tax_id')}</span> 3148801837</p>
              <p><span className="text-gold-400">{t('info.legal_address')}</span> 1A, vul. Sahaidachnoho, Ternopil, 46002</p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-cream-50">{t('info.payment')}</h3>
            <div className="glass rounded-lg p-6 text-sm text-gray-400 leading-relaxed space-y-4">
              <p>{t('info.card')}</p>
              <p>{t('info.payment_desc')}</p>
              <p>{t('info.payment_desc_2')}</p>

              <h4 className="font-bold text-cream-50 pt-2">{t('info.data_transfer')}</h4>
              <p>{t('info.data_transfer_text')}</p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-cream-50">{t('info.refund')}</h3>
            <div className="glass rounded-lg p-6 text-sm text-gray-400 leading-relaxed space-y-3">
              <p>{t('info.refund_text')}</p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-cream-50">{t('info.return_goods')}</h3>
            <div className="glass rounded-lg p-6 text-sm text-gray-400 leading-relaxed space-y-3">
              <p>{t('info.return_goods_text')}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
