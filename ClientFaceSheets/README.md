# 📋 クライアントフェイスシート管理システム

## 🎯 システム概要

このシステムは、障害福祉サービス利用者のフェイスシート（基本情報）をObsidianのDatabase Folderプラグインで効率的に管理するためのシステムです。

### 主な機能
- 📝 **構造化データ管理**: YAMLフロントマターによる構造化された情報管理
- 📊 **表形式・カード形式表示**: Database Folderによる見やすい一覧表示
- 🔍 **検索・フィルター**: 条件による絞り込み機能
- 💾 **CSV出力**: Excel等で利用可能なCSV形式でのデータ出力
- 📋 **テンプレート機能**: 統一された書式での情報入力

## 🗂️ ファイル構成

```
ClientFaceSheets/
├── dbfolder.json                    # Database Folder設定ファイル
├── README.md                        # このファイル（使い方説明書）
├── フェイスシートテンプレート.md      # 新規作成用テンプレート
├── 小林浩秋_フェイスシート.md        # サンプルデータ
└── [クライアント名]_フェイスシート.md # 各クライアントのフェイスシート
```

## 🚀 使用開始手順

### 1. Database Folderプラグインの設定

1. **プラグインインストール**
   - Obsidianの設定 → コミュニティプラグイン
   - "Database Folder"を検索してインストール・有効化

2. **フォルダ設定**
   - `ClientFaceSheets`フォルダを右クリック
   - "Database Folder Settings"を選択
   - 自動で`dbfolder.json`設定が読み込まれます

### 2. 新しいクライアント情報の追加

1. **テンプレートコピー**
   - `フェイスシートテンプレート.md`をコピー
   - ファイル名を`[クライアント名]_フェイスシート.md`に変更

2. **情報入力**
   - ファイルのYAMLフロントマター部分に基本情報を入力
   - 本文部分に詳細情報を記入

## 📊 Column構成

### 基本フィールド
- **client_name** (氏名): Text型、必須
- **birth_date** (生年月日): Date型、必須
- **age** (年齢): Number型
- **gender** (性別): Select型（男性/女性）
- **disability_class** (障害支援区分): Select型（区分1-6）
- **address** (住所): Text型
- **phone** (電話番号): Text型
- **recipient_number** (受給者証番号): Text型
- **medical_institution** (主治医療機関): Text型
- **main_doctor** (主治医): Text型
- **residence_type** (居住形態): Select型（GH/自宅/施設/その他）
- **status** (利用状況): Select型（利用中/体験中/検討中/利用終了）
- **start_date** (利用開始日): Date型
- **last_updated** (最終更新日): Date型

### 追加フィールド
- **postal_code** (郵便番号): Text型
- **therapeutic_notebook** (療育手帳): Text型
- **mental_illness** (精神疾患): Text型
- **intellectual_disability** (知的障害): Text型
- **clinic_phone** (医療機関電話番号): Text型
- **visit_frequency** (受診頻度): Text型
- **pension_amount** (障害年金): Number型
- **savings_amount** (預金額): Number型
- **gh_fee** (GH利用料): Number型

## 🎨 利用状況の色分け

- 🟢 **利用中** (active): 緑色 `#4CAF50`
- 🔵 **体験中** (trial): 青色 `#2196F3`
- 🟠 **検討中** (considering): オレンジ色 `#FF9800`
- ⚫ **利用終了** (ended): グレー色 `#9E9E9E`

## 📈 DataviewJS活用

### 基本的な使い方

```javascript
// クライアント一覧表示
```dataviewjs
// Scripts/client_facesheet_dataview_queries.js を読み込み
const clientQueries = await dv.execute(`Scripts/client_facesheet_dataview_queries.js`);

// 基本の一覧表示
displayClientList();
```

### 利用可能な関数

1. **displayClientList()**: クライアント一覧を表形式で表示
2. **displayStatusSummary()**: 利用状況別のサマリーを表示
3. **displayByMedicalInstitution()**: 医療機関別の一覧を表示
4. **generateCSV()**: CSV形式でデータを出力
5. **searchClients(検索キーワード)**: キーワードでクライアント検索

### CSV出力の使い方

```javascript
```dataviewjs
// CSV出力
generateCSV();
```

出力されたCSVデータは以下の手順で利用できます：
1. 表示されたCSVデータをコピー
2. メモ帳等のテキストエディタに貼り付け
3. `.csv`拡張子で保存
4. ExcelやGoogle Spreadsheetsで開く

## 🔍 検索・フィルター機能

### Database Folderでの検索
- 各Column上部の検索ボックスで文字列検索
- Select型フィールドはドロップダウンでフィルター
- 複数条件での組み合わせ検索可能

### DataviewJSでの検索
```javascript
```dataviewjs
// 「鈴鹿」を含むクライアントを検索
searchClients("鈴鹿");
```

## 📝 入力時の注意事項

### 日付形式
- **統一形式**: `YYYY-MM-DD` （例：2025-06-11）
- **和暦併記**: 本文中では「令和6年6月11日」形式も使用可

### 選択肢の値
- **gender**: `male` または `female`
- **disability_class**: `class1` ～ `class6`
- **residence_type**: `gh`, `home`, `facility`, `other`
- **status**: `active`, `trial`, `considering`, `ended`

### 金額の入力
- **年金・預金等**: 数値のみ入力（円単位）
- 例：70000（7万円の場合）

## 🔄 定期メンテナンス

### 月次チェック項目
- [ ] **last_updated**（最終更新日）の更新
- [ ] **status**（利用状況）の確認・更新
- [ ] 新規クライアントの情報入力
- [ ] 利用終了クライアントのステータス更新

### CSV出力推奨タイミング
- 月末締めでの定期出力
- 監査・報告書作成時
- データバックアップ時

## 🚨 トラブルシューティング

### Database Folderが表示されない
1. プラグインが有効化されているか確認
2. `dbfolder.json`ファイルが正しい場所にあるか確認
3. Obsidianを再起動

### CSVデータが文字化けする
1. CSVファイル保存時にUTF-8エンコードを指定
2. Excelで開く際は「データ」→「テキストファイル」から読み込み

### DataviewJSが動作しない
1. Dataviewプラグインが有効化されているか確認
2. JavaScriptクエリが有効になっているか確認（Dataview設定）

## 📞 サポート・お問い合わせ

システムに関するご質問やトラブルがございましたら、以下の情報を整理してお問い合わせください：

- 使用中のObsidianバージョン
- インストール済みプラグイン一覧
- エラーメッセージ（あれば）
- 実行しようとした操作の詳細

---

## 📚 関連ドキュメント

- [Database Folder Plugin Documentation](https://github.com/RafaelGB/obsidian-db-folder)
- [Dataview Plugin Documentation](https://blacksmithgu.github.io/obsidian-dataview/)
- [YAML Frontmatterについて](https://help.obsidian.md/Advanced+topics/YAML+front+matter)

---

**最終更新**: 2025-06-11  
**作成者**: おひさま農園システム管理  
**バージョン**: 1.0 