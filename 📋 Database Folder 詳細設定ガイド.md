# 📋 Database Folder 詳細設定ガイド

## 概要
Database Folder プラグインを使用して、StaffShifts フォルダを効率的なデータベースとして管理するための詳細設定手順です。

## 1. プラグインのインストール

### インストール手順
1. **Settings（設定）** → **Community plugins（コミュニティプラグイン）**
2. **Browse（参照）** をクリック
3. 検索欄で「**Database Folder**」を検索
4. **rafaelgb** 作成のプラグインを選択
5. **Install（インストール）** → **Enable（有効化）**

### 必要な権限
- ファイル読み書き権限
- フォルダ構造変更権限

## 2. StaffShifts フォルダの変換

### 基本変換手順
1. **StaffShifts フォルダを開く**
2. **Ctrl+P**（コマンドパレット）
3. 「**Database: Convert current folder to DB**」を検索・選択
4. 確認ダイアログで「**はい**」を選択

### 変換後の確認項目
- [ ] フォルダアイコンがデータベース形式に変更
- [ ] 上部に Database Folder のツールバーが表示
- [ ] 既存の .md ファイルがテーブル行として認識

## 3. 詳細設定項目

### A. Global Settings（グローバル設定）

#### Database Configuration
```yaml
# .db_folder_config.yaml (自動生成)
version: "1.0"
name: "StaffShifts"
description: "スタッフシフト管理データベース"
source_data: "folder"
source_form_result: "yaml"
source_destination_path: ""
```

#### Column Configuration
| プロパティ | 設定値 | 詳細説明 |
|-----------|--------|----------|
| **Auto-generate ID** | OFF | ファイル名がIDとして機能するため |
| **Auto-generate created date** | OFF | 手動で date を管理 |
| **Auto-generate modified date** | ON | 更新履歴の記録 |

### B. Column Settings（列設定）

#### 1. date 列
```yaml
設定項目:
  name: "date"
  key: "date"
  type: "date"
  format: "yyyy-MM-dd"
  default_value: ""
  is_required: true
  is_unique: false
  sort_order: "asc"
```

#### 2. title 列
```yaml
設定項目:
  name: "title"
  key: "title"
  type: "text"
  max_length: 50
  default_value: ""
  is_required: true
  validation: ".*"
```

#### 3. staffId 列
```yaml
設定項目:
  name: "staffId"
  key: "staffId"
  type: "text"
  max_length: 10
  default_value: ""
  is_required: true
  format: "S[0-9]{3}"
```

#### 4. shift_code 列
```yaml
設定項目:
  name: "shift_code"
  key: "shift_code"
  type: "select"
  options:
    - value: "A"
      label: "通常勤務"
      color: "#4CAF50"
    - value: "B"
      label: "午前休"
      color: "#2196F3"
    - value: "C"
      label: "午後休"
      color: "#FF9800"
    - value: "D"
      label: "完全休"
      color: "#9E9E9E"
  default_value: "A"
  is_required: true
```

#### 5. time 列
```yaml
設定項目:
  name: "time"
  key: "time"
  type: "text"
  format: "[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}"
  default_value: "09:00-17:00"
  placeholder: "HH:MM-HH:MM"
```

## 4. ビュー設定

### A. Table View（テーブル表示）
```yaml
columns_visible:
  - "title"
  - "date"
  - "shift_code"
  - "time"
columns_width:
  title: 120
  date: 100
  shift_code: 80
  time: 100
sort_by: "date"
sort_order: "asc"
```

### B. Calendar View（カレンダー表示）
```yaml
calendar_settings:
  date_field: "date"
  title_field: "title"
  color_field: "shift_code"
  initial_view: "dayGridMonth"
  first_day: 1  # 月曜日開始
  business_hours:
    start: "09:00"
    end: "17:00"
  event_display:
    - field: "shift_code"
      position: "badge"
    - field: "time"
      position: "subtitle"
```

### C. Card View（カード表示）
```yaml
card_settings:
  title_field: "title"
  subtitle_field: "time"
  body_fields:
    - "shift_code"
    - "date"
  image_field: ""
  card_width: 250
  cards_per_row: 4
```

## 5. フィルター・検索設定

### A. Quick Filters（クイックフィルター）
```yaml
quick_filters:
  - name: "今日のシフト"
    field: "date"
    operator: "="
    value: "{{TODAY}}"
  - name: "今週のシフト"
    field: "date"
    operator: "between"
    value: ["{{WEEK_START}}", "{{WEEK_END}}"]
  - name: "通常勤務のみ"
    field: "shift_code"
    operator: "="
    value: "A"
```

### B. Advanced Search（高度な検索）
```yaml
search_settings:
  enabled: true
  fields:
    - "title"
    - "staffId"
  fuzzy_search: true
  case_sensitive: false
```

## 6. 自動化設定

### A. Template Settings（テンプレート設定）
```yaml
new_file_template: |
  ---
  title: "{{input:スタッフ名}}"
  staffId: "{{input:スタッフID}}"
  date: "{{DATE:YYYY-MM-DD}}"
  shift_code: "{{select:A,B,C,D}}"
  time: "{{input:時間}}"
  ---
  # シフトメモ（任意）
  {{input:メモ}}
```

### B. File Naming（ファイル命名規則）
```yaml
file_naming:
  pattern: "{{title}}_{{date}}"
  auto_rename: true
  conflict_resolution: "append_number"
```

## 7. 実際の設定手順

### Step 1: 基本設定
1. StaffShifts フォルダを開く
2. 右上の **⚙️（設定）** アイコンをクリック
3. **Database Settings** を選択

### Step 2: Column設定
1. **Columns** タブを選択
2. **Add Column** で新しい列を追加
3. 各列の設定を上記の通りに設定
4. **Save** で保存

### Step 3: View設定
1. **Views** タブを選択
2. **Calendar View** を有効化
3. Date field を `date` に設定
4. Color mapping を `shift_code` に設定

### Step 4: Filter設定
1. **Filters** タブを選択
2. Quick Filters を設定
3. Default filter を設定（オプション）

## 8. 動作確認

### 確認項目チェックリスト
- [ ] **テーブル表示**: 全ファイルが正しく表示される
- [ ] **カレンダー表示**: 日付でイベントが表示される
- [ ] **色分け**: shift_code による色分けが動作
- [ ] **フィルター**: staffId でフィルタリング可能
- [ ] **編集**: セル直接編集が可能
- [ ] **新規作成**: 空白日をクリックで新規作成
- [ ] **削除**: 行の削除が可能

## 9. パフォーマンス最適化

### 大量データ対応
```yaml
performance_settings:
  lazy_loading: true
  pagination: 50
  index_fields:
    - "date"
    - "staffId"
  cache_enabled: true
```

## 10. トラブルシューティング

### よくある問題と解決策

#### Q1: カレンダーにイベントが表示されない
**A1**: 
- Date field の設定を確認
- YAML の date 形式が `YYYY-MM-DD` か確認
- ファイルのfront-matterが正しいか確認

#### Q2: 色分けが効かない
**A2**:
- shift_code の値が設定されているか確認
- Column設定でoptionsが正しく設定されているか確認

#### Q3: 新規作成時にエラーが発生する
**A3**:
- Template設定を確認
- ファイル名の重複がないか確認
- 必須項目が設定されているか確認

#### Q4: フィルターが動作しない
**A4**:
- フィルター対象の列が存在するか確認
- データ型が一致しているか確認

## 11. 高度な活用方法

### A. 複数ビューの活用
- 管理者用: 全スタッフ表示
- スタッフ用: 個人フィルター表示
- 月別: 月単位での表示切り替え

### B. データ連携
- Daily Notes との連携
- Templater プラグインとの組み合わせ
- DataviewJS でのカスタム表示

### C. バックアップ・エクスポート
- CSV エクスポート機能
- JSON形式でのバックアップ
- 他システムとの連携

これらの設定により、StaffShifts フォルダが強力なシフト管理データベースとして機能します。 