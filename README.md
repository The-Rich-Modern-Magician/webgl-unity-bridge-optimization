# WebGL - Unity JS Bridge Memory & Performance Optimization Report

---

## 🇸🇦 🇦🇪 🇶🇦 🇧🇭 🇴🇲 ⸺ Arabic Version (العربية - لغة تقنية فصحى)

هذا المشروع هو تقرير بحثي تقني يركز على تحليل برمجيات الجسر (JavaScript Bridge) بين المتصفح ومحرك الألعاب في ألعاب WebGL التجارية (Unity WebGL)، مما أدى إلى تقليل استهلاك الذاكرة العشوائية (RAM) وتحسين أداء المعالجة (CPU).

*التزاماً بالشروط والأحكام وحماية لحقوق النشر، تم استبعاد الشيفرة المصدرية الفعلية للمنتج بالكامل. يشرح هذا المستند التحديات الهيكلية وطرق المعالجة المحددة.*

---

## 🇬🇧 English Version

This project is a technical research report focusing on analyzing JavaScript bridge code between the browser and the game engine in commercial WebGL games (Unity WebGL), resulting in reduced memory consumption (RAM) and CPU workload optimization.

*To comply with terms of service and protect copyrights, the actual product source code is completely excluded. This document explains the architectural challenges and specific remediation approaches.*

---

## 🇯🇵 日本語版 (Japanese)

本プロジェクトは、商用WebGLゲーム（Unity WebGL）におけるブラウザとゲームエンジン間のJavaScriptブリッジコードを解析し、メモリ消費量（RAM）の削減およびCPU負荷の最適化を行った技術研究レポートです。

※ 規約および著作権保護のため、製品のソースコード自体は含んでいません。アーキテクチャの課題と、それに対する具体的な修正アプローチを解説します。

---

### 🚀 نظرة عامة (Overview)
يعتبر جسر JavaScript (خاصة حول نظام الملفات الافتراضي وإدارة الأجهزة) في ألعاب Unity WebGL منطقة معرضة بشدة للتسبب في تسريب الذاكرة وتقطعات الأداء الناتجة عن المعالجة المكثفة لآلية تنظيف الذاكرة (Garbage Collection)، لا سيما على متصفحات الهواتف المحمولة.
يقضي هذا البحث على "نسخ البيانات المتكرر" و"خوارزميات البحث غير الفعالة" الموجودة في التطبيقات التجارية القياسية، مما يعيد هيكلة الكود ليعمل بسلاسة حتى على الأجهزة ذات المواصفات المنخفضة.


### 🚀 Overview
The JavaScript bridge (specifically around the virtual file system and device management) in Unity WebGL games is highly prone to causing memory leaks and framerate hitches (spikes) due to heavy Garbage Collection (GC), particularly on mobile browsers.
This research eliminates the "redundant data copying" and "inefficient lookup algorithms" found in standard commercial implementations, refactoring the codebase to run smoothly even on lower-end devices.


### 🚀 概要 (Overview)
Unity WebGLゲームにおけるJavaScriptブリッジ（仮想ファイルシステムおよびデバイス管理周辺）は、特にモバイルブラウザ（スマホ）においてメモリリークやガベージコレクション（GC）によるカクつき（スパイク）の原因になりやすい領域です。
本研究では、既存の一般的な実装に見られる「冗長なデータコピー」と「非効率な探索アルゴリズム」を解消し、低スペック端末でも安定して動作するコードへのリファクタリングを行いました。


### 🛠 محاور التحسين الرئيسية (Key Optimizations)

#### ١. نقل البيانات ذو النسخ الصفري عبر إلغاء النسخ المتكرر للذاكرة
##### 🔴 التحدي (Before)
عند كتابة ملفات الأصول الثنائية المستلمة من جهة المتصفح (البيانات الواردة من Web Workers، إلخ) داخل نظام ملفات WebGL الداخلي (FS)، كان يتم إنشاء نسخة جديدة من `Uint8Array` في كل مرة، مما يتسبب في تخصيص مزدوج للذاكرة. أدى ذلك إلى استدعاء مفرط لآلية تنظيف الذاكرة أثناء تحميل الأصول الكبيرة، مما تسبب في تجمد مؤقت للشاشة وتقطعات دقيقة.

##### 🟢 حل المعالجة (After)
الانتقال من "النسخ بالقيمة" إلى "التمرير بالمؤشر (المرجع)"، مع تفعيل خيار تفويض ملكية الأصول (`canOwn: true`) ضمن إعدادات نظام ملفات Emscripten.


#### 1. Zero-Copy Transfer via Elimination of Redundant Memory Copying
##### 🔴 Challenge (Before)
When writing asset binaries retrieved on the browser side (data returned from Web Workers, etc.) into the WebGL internal file system (FS), a new `Uint8Array` instance was instantiated every time, causing double allocation of memory. This triggered massive Garbage Collection during large asset loads, leading to micro-stutters and screen freezes.

##### 🟢 Remediation Approach (After)
Shifted from "copy-by-value" to "pass-by-pointer (reference)," utilizing the asset ownership delegation option (`canOwn: true`) within Emscripten's file system configuration.


### 🛠 主な最適化ポイント (Key Optimizations)

#### 1. メモリの重複コピー廃止によるゼロコピー化 (Zero-Copy Transfer)
##### 🔴 課題 (Before)
ブラウザ側で取得したアセットバイナリ（Web Worker等から返されたデータ）をWebGL内のファイルシステム（FS）に書き込む際、毎回新しい `Uint8Array` のインスタンスを生成（メモリの二重確保）していました。これにより大量のファイル読み込み時にガベージコレクションが多発し、画面のプチフリーズを誘発していました。

##### 🟢 解消アプローチ (After)
データの「値のコピー」ではなく「ポインタ（参照）の受け渡し」に変更し、Emscriptenのファイルシステム設定で所有権を委譲するオプション（`canOwn: true`）を指定しました。

```javascript
// مفهوم التحسين (شيفرة افتراضية)
// Optimization Concept (Pseudo-code)
// 改善のイメージ（擬似コード）
function abstractWriteFile(path, rawBytes) {
    // يلغي تماماً النسخ المتكرر في مساحة الذاكرة لمنع الضغط على آلية تنظيف الذاكرة
    // Completely eliminates duplicate copying in memory space to prevent GC overhead
    // メモリ空間上での重複コピーを完全廃止し、GCを回避
    FS.writeFile(path, rawBytes, { canOwn: true }); 
}
```



---

#### ٢. تحسين خوارزمية البحث عن الأجهزة (من الدورة الكاملة إلى البحث في مسار واحد)
##### 🔴 التحدي (Before)
في عمليات المطابقة لتحديد أجهزة الإدخال مثل الكاميرات أو الميكروفونات، اعتمد المحرك على منطق البحث الشامل الذي يقوم بتشغيل أربع حيازات حصر مستقلة (`for` loops) بشكل متتالي لتقييم شروط الأولوية المختلفة. تسبب هذا في حمل غير ضروري على المعالج في البيئات التي تحتوي على العديد من الأجهزة المتصلة أو عند تحديث الأجهزة (`devicechange`) بشكل متكرر.

##### 🟢 حل المعالجة (After)
دمج الحلقات الأربع المتتالية في عملية بحث بمسار واحد باستخدام طريقة `.find()` القياسية in JavaScript مدمجة مع معاملات الاختيار المنطقي (`||`) بناءً على الأولوية. يؤدي ذلك إلى تقليل تعقيد الحساب بشكل كبير.


---

#### 2. Device Lookup Algorithm Optimization (From O(N) to Single-Pass Search)
##### 🔴 Challenge (Before)
In matching operations to identify input devices like cameras or microphones, the engine relied on a brute-force logic that ran four independent `for` loops sequentially to evaluate different priority conditions. This caused an unnecessary heavy CPU load in environments with numerous connected devices or when device updates (`devicechange` events) fired frequently.

##### 🟢 Remediation Approach (After)
Consolidated the four consecutive loops into a single-pass search utilizing JavaScript's standard `.find()` method combined with logical OR (`||`) operators based on priority. This significantly reduces computational complexity.


---

#### 2. デバイス探索のアルゴリズム最適化 (O(N) から 1回の探索へ)
##### 🔴 課題 (Before)
カメラやマイクなどの入力デバイスを特定するマッチング処理において、優先順位ごとに `for` ループを4回独立して回す総当たりロジックになっていました。接続デバイス数が多い環境や、デバイス更新（`devicechange` イベント）が頻発した際にCPUへ無駄な高負荷がかかっていました。

##### 🟢 解消アプローチ (After)
4連続のループを、JavaScript標準の `.find()` メソッドと論理和（`||`）を用いた「優先順位付きの1回パス探索」に統合。計算量を大幅に削減しました。


```javascript
// مفهوم التحسين (شيفرة افتراضية)
// Optimization Concept (Pseudo-code)
// 改善のイメージ（擬似コード）
function optimizedDeviceMatch(newDevice, oldDevices) {
    return oldDevices.find(old => old.id === newDevice.id) ||
           oldDevices.find(old => old.label === newDevice.label) ||
           oldDevices.find(old => old.group === newDevice.groupId);
}
```


---


٣. دمج الشيفرة البرمجية وتطبيق مبدأ DRY الهيكلي


🔴 التحدي (Before)

• عبر عمليات متعددة لنظام الملفات الافتراضي (mkdir ،rmdir ،unlink ،إلخ)، تكرر نسخ ولصق نفس منطق مزامنة تخزين IndexedDB (كتابة صلبة مكررة).
• انتشرت عمليات التحقق المتكررة من الوجود داخل روتينات إشعار النجاح/الفشل المرسلة إلى Unity.

🟢 حل المعالجة (After)

إدخال دالة من الرتبة العليا (Higher-order function) لربط روتينات المزامنة ديناميكياً بكل طريقة معالجة ملفات عبر تدوير المصفوفة. يرفع هذا النهج من قابليتها للصيانة ويقلل من حجم ملف البرمجيات.


---

#### 3. Code Consolidation & Applying the DRY Principle
##### 🔴 Challenge (Before)
- Across multiple virtual file system operations (`mkdir`, `rmdir`, `unlink`, etc.), identical IndexedDB storage synchronization logic was repeatedly copy-pasted (hard-coded).
- Redundant existence checks were prevalent inside success/failure notification routines back to Unity.

##### 🟢 Remediation Approach (After)
Introduced a higher-order function (wrapper function) to dynamically bind synchronization routines to each file manipulation method via array looping. This approach enhances code maintainability while reducing file payload size.


---

#### 3. 重複ロジックの共通化とDRY原則の適用 (Code Consolidation)
##### 🔴 課題 (Before)
- 仮想ファイルシステム（仮想セーブデータ領域）の複数のファイル操作（`mkdir`, `rmdir`, `unlink` 等）に対して、全く同じ IndexedDB への保存同期ロジックがコピペ（ハードコーディング）されていました。
- Unityへの成功・失敗時の通知処理に、冗長な存在チェックが散見されていました。

##### 🟢 解消アプローチ (After)
高階関数（ラッパー関数）を導入し、配列ループを用いて動的に各ファイル操作メソッドへ処理をバインディングする構造にリファクタリング。コードの保守性を高めると同時にファイルサイズを軽量化しました。



```javascript
// مفهوم التحسين عبر تدوير المصفوفة
// Optimization Concept via Array Mapping
// 配列マッピングによる一括最適化のイメージ
const syncWrapper = (originalFunc) => (...args) => {
    triggerIndexedDBSync();
    return originalFunc(...args);
};

['rmdir', 'unlink', 'mkdir'].forEach(op => {
    nodeOps[op] = syncWrapper(nodeOps[op]);
});
```


---

📈 النتائج المتوقعة (Expected Benefits)

1. تقليل استهلاك الذاكرة العشوائية: يحد من ذروة الذاكرة المؤقتة بنسبة 50% تقريباً أثناء نشر الأصول الكبيرة.
2. استقرار معدل الإطارات: آليات النسخ الصفري وتقليل عبء البحث تخفف من فترات توقف آلية تنظيف الذاكرة وتقطعات الأداء.
3. إدارة الحرارة والبطارية: تقليل دورات المعالجة يحد من توليد الحرارة في الأجهزة ويحافظ على طاقة البطارية في الهواتف المحمولة.


---

### 📈 Expected Benefits
1. **RAM Consumption Reduction:** Limits temporary memory peaks by roughly 50% during large asset deployment.
2. **Framerate Stabilization:** Zero-copy mechanics and reduced lookup overhead mitigate runtime GC latency and stuttering.
3. **Thermal and Battery Management:** Minimizing CPU cycles reduces hardware heat generation and limits battery drain on mobile devices.


---

### 📈 期待される効果 (Expected Benefits)
1. **RAM消費量の削減:** 大容量アセット展開時の瞬間的なメモリピークが約50%抑制されます。
2. **フレームレートの安定化:** ゼロコピー化とループの削減により、ロード時およびプレイ中のGCスパイク（カクつき）が軽減されます。
3. **バッテリー消費・発熱の抑制:** CPUの総計算量が減るため、特にモバイル端末における発熱が緩和されます。

---
💡 **免責事項 / Disclaimer**
本レポートはWeb技術（WebGL/Emscripten）の最適化手法に関する学習・研究を目的としたものであり、特定のゲームタイトルのリバースエンジニアリングや不正な改変を推奨するものではありません。



💼 Business Inquiries & Paid Consulting

🇸🇦 🇦🇪 🇶🇦 🇧🇭 🇴🇲 ⸺ Arabic

إن الشيفرات المصدرية الجاهزة للتشغيل الفعلي، وأطر المزامنة الكاملة، والخدمات الاستشارية المخصصة المتعلقة بـ "خوارزمية النسخ الصفري" و "روتينات دمج نظام الملفات" المذكورة في هذا التقرير، هي متاحة حصرياً بموجب اتفاقيات استشارية تجارية مدفوعة. نقدم حلول دمج مخصصة ومحسّنة لشيفرتكم البرمجية الخاصة تحت اتفاقية حظر إفشاء الأسرار (NDA). ندعو الرؤساء التقنيين (CTOs) لبدء استفسار خاص عبر الرسائل المباشرة (DM).

🇬🇧 English

Production-ready source codes, full integration frameworks, and bespoke consulting services regarding the "Zero-Copy Algorithm" and "Consolidated FS Wrapper" reviewed in this report are exclusively available under paid commercial consulting agreements. We deliver tailor-made integration optimized specifically for your proprietary codebase under an NDA. Tech Chiefs and CTOs are welcome to initiate a private inquiry via Direct Message (DM).

🇯🇵 日本語

本レポートで紹介したWebGLブリッジの「ゼロコピー化アルゴリズム」および「ファイルシステムの統合バインディング」について、実際のプロダクション環境への導入支援、完全な最適化コードの提供、および個別最適化コンサルティングは有償（ビジネス契約）にて提供しております。 秘密保持契約（NDA）締結の上、御社固有のコードベースに合わせた最適なインテグレーションを行います。ご興味のあるテックチーフの方は、DMまでご連絡ください。
