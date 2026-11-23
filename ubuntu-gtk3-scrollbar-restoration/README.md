# Classic Wide Scrollbar & Stepper Restoration for GTK3 (Ubuntu / GNOME)

---

<div align="center">

بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

<table>
  <tr>
    <td><img width="600" alt="rectangle_large_type_2_edd2ddab3015bc454690f6f477a2efad" src="https://github.com/user-attachments/assets/7ecd0500-8032-46ef-bc2f-31ad7d2c8384" /></td>
    <td><img width="600" alt="rectangle_large_type_2_a9e3a0fbaba1328dfe0fe0956d5b594d" src="https://github.com/user-attachments/assets/652a34b6-e699-445e-9220-a106972c728b" /></td>
  </tr>
  <tr>
    <td><img width="600" alt="rectangle_large_type_2_6148c3dd2432e0f093c12ed6ec77cad3" src="https://github.com/user-attachments/assets/f450fd2e-05c7-474f-b94b-207f1ea5e0d6" /></td>
    <td><img width="600" alt="rectangle_large_type_2_72a77dd548bfa1a3a40f45b9d948709c" src="https://github.com/user-attachments/assets/7211d0c1-8cff-469e-b32f-1a4119321503" /></td>
  </tr>
</table>

</div>

---

🔗 **Official Hub & All Technical Articles / Repositories:**  
[The Rich Modern Magician Official (Linktree)](https://linktr.ee/therichmodernmagician)  
*(Access to DEV Community articles, GitHub WebGL/Wasm optimization reports, X, and project links)*

---

## 🇸🇦 🇦🇪 🇶🇦 🇧🇭 🇴🇲 ⸺ Arabic Version (العربية - LTR Mode)

### 🚀 [AR] نظرة عامة (Overview)
‎[AR] يهدف هذا الملف (`gtk.css`) إلى استعادة أشرطة التمرير العريضة الكلاسيكية وأزرار الأسهم (Steppers) في بيئات سطح المكتب الحديثة لنظام لينكس (Ubuntu / GNOME)، والتي تم إخفاؤها أو تصغيرها بشكل مفرط في التصميمات الافتراضية، مما يحسن دقة التحكم بالماوس ويمنع التمرير البطيء.

### 🖥 [AR] البيئة المختبرة (Tested Environment)
* ‎**نظام التشغيل (OS / DE):** Ubuntu 24.04 LTS / GNOME Desktop
* ‎**التطبيقات المستهدفة (Target):** GTK 3.0 applications

### 🛠 [AR] طريقة التثبيت (Installation)
1. ‎انسخ ملف `gtk.css` إلى المسار التالي (أنشئ المجلد إذا لم يكن موجوداً):
   `~/.config/gtk-3.0/gtk.css`
2. ‎أعد تشغيل تطبيقات GTK3 أو أعد تسجيل الدخول لتطبيق التغييرات فوراً.

### ⚠️ [AR] ملاحظات تقنية (Technical Notes & Caveats)
* ‎**لتطبيقات GTK3 فقط (GTK3 Only):**
  ‎هذا الكود مخصص حصريًا لملف `~/.config/gtk-3.0/gtk.css` (تطبيقات GTK3). ولا ينطبق على تطبيقات GTK4 أو المتصفحات ذات الواجهات المخصصة مثل Firefox و Chrome.
* ‎**تحذيرات الإيقاف (Deprecation Warnings):**
  ‎تُعتبر خصائص مثل `-GtkScrollbar-has-backward-stepper` قديمة (Deprecated) في إصدارات GTK3 الأحدث، لذا قد تظهر لك تحذيرات غير ضارة عند تشغيل التطبيقات من الطرفية (Terminal). ومع ذلك، فهي لا تزال ضرورية لإجبار أزرار الأسهم على الظهور ولا تؤثر على الأداء.

---

## 🇬🇧 English Version

### 🚀 Overview
This custom stylesheet (`gtk.css`) restores classic wide scrollbars and directional stepper arrow buttons in modern Linux desktop environments (Ubuntu / GNOME), solving usability issues caused by overly thin, buttonless default scrollbars.

### 🖥 Tested Environment
* **OS / DE:** Ubuntu 24.04 LTS / GNOME Desktop
* **Target:** GTK 3.0 applications

### 🛠 Installation
1. Place `gtk.css` into your local GTK3 configuration directory (create the directory if it does not exist):
   `~/.config/gtk-3.0/gtk.css`
2. Restart your GTK3 applications (or log out and back in) for the changes to take effect.

### ⚠️ Technical Notes & Caveats
* **GTK3 Only:**
  This CSS is strictly for `~/.config/gtk-3.0/gtk.css` (GTK3 applications). It does not apply to GTK4 apps or browsers with custom UIs like Firefox and Chrome.
* **Deprecation Warnings:**
  Properties like `-GtkScrollbar-has-backward-stepper` are marked as deprecated in newer GTK3 versions, so you may see harmless warnings when launching apps from the terminal. However, they are still required to force the arrow buttons to appear and do not affect runtime stability.

---

## 🇯🇵 日本語版 (Japanese)

### 🚀 概要 (Overview)
本スタイルシート（`gtk.css`）は、近年のLinuxデスクトップ環境（Ubuntu / GNOME）で省略・極細化されて使いづらくなったスクロールバーの太さと、上下左右の矢印ボタン（ステッパー）を強制復活させ、マウス操作の快適性を劇的に改善するカスタムCSS設定です。

### 🖥 動作確認環境 (Tested Environment)
* **OS / デスクトップ環境:** Ubuntu 24.04 LTS / GNOME
* **対象:** GTK 3.0 アプリケーション

### 🛠 導入手順 (Installation)
1. 以下のパスに `gtk.css` を配置します（フォルダが存在しない場合は作成してください）：
   `~/.config/gtk-3.0/gtk.css`
2. GTK3アプリを再起動するか、再ログインすると即座に反映されます。

### ⚠️ 技術的な注意点 (Technical Notes & Caveats)
* **GTK3アプリ専用（GTK3 Only）:**
  このCSSは `~/.config/gtk-3.0/gtk.css`（GTK3アプリケーション）専用です。GTK4アプリや、Firefox・Chromeなどの独自UIを持つブラウザには適用されません。
* **非推奨プロパティの警告について（Deprecation Warnings）:**
  `-GtkScrollbar-has-backward-stepper` などのプロパティは新しいGTK3では非推奨（Deprecated）扱いとなっており、ターミナルからアプリを起動した際に警告ログが出ることがあります。しかし、矢印ボタンを強制表示させるために不可欠な記述であり、動作には一切支障ありません。

---

## 🔗 More From The Rich Modern Magician (公式リンク集・その他の研究記事)

* **Official Hub (Linktree):** [https://linktr.ee/therichmodernmagician](https://linktr.ee/therichmodernmagician)
  * **AR:** الرابط الرسمي الشامل لجميع المقالات التقنية، أبحاث تحسين أداء WebGL/Wasm، وحساب X.
  * **EN:** Official hub containing all DEV Community technical case studies, GitHub WebGL/Emscripten optimization reports, and X.
  * **JA:** DEV Communityの技術解析記事、GitHubのWebGL/Wasm最適化レポート、X（旧Twitter）などをまとめた公式リンク集です。

‎اللَّهُ أَكْبَرُ

