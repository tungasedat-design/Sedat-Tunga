# Av. Sedat Tunga — GitHub Pages Yayın Paketi

Bu klasör, harici bir derleme süreci gerektirmeden GitHub Pages üzerinde yayımlanabilen tamamen statik web sitesidir. Ana sayfa `index.html`; stil dosyası `styles.css`; etkileşim dosyası `script.js` ve görsel varlıklar `assets/` klasöründedir.

## GitHub Pages ile yayınlama

Yeni bir GitHub deposu oluşturun ve bu klasörün **içeriğini** deponun kök dizinine yükleyin. GitHub'da **Settings → Pages** altında yayın kaynağı olarak `Deploy from a branch`, dal olarak `main` ve klasör olarak `/ (root)` seçin. Kaydedildiğinde GitHub, siteniz için ücretsiz bir adres oluşturacaktır.

Yayın öncesinde `index.html` içindeki `canonical`, `og:url`, `og:image` ve `twitter:image` değerlerini kendi GitHub Pages adresinizle mutlak URL olarak güncelleyin. Ayrıca kurumsal e-posta, telefon, LinkedIn ve akademik profil bağlantılarını doğrulanmış bilgilerinizle değiştirin.

## Statik form davranışı

İletişim formu istemci tarafında doğrulama yapar; sunucuya veri göndermez. GitHub Pages statik olduğundan gerçek form teslimi için bir form hizmeti veya kurumsal e-posta yönlendirmesi ayrıca yapılandırılmalıdır.

## Dosya yapısı

| Öğe | İşlev |
| --- | --- |
| `index.html` | Semantik HTML5 yapı, SEO ve OpenGraph meta etiketleri |
| `styles.css` | Responsive modern CSS3, açık/koyu tema ve erişilebilirlik kuralları |
| `script.js` | Mobil menü, tema tercihi, makale modalları, filtreler, vCard ve form doğrulaması |
| `assets/` | Hero görseli, arşiv görseli ve ST monogramı |

> Site, hukuki danışmanlık sunmayan bilgilendirme amaçlı bir yayın altyapısı olarak tasarlanmıştır. Yayına almadan önce iletişim ve baro bilgilerini doğrulamanız gerekir.
