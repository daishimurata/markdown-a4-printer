# StaffShifts - Database Folder 設定ガイド

このフォルダは **Database Folder プラグイン** でスタッフシフト管理を行うためのものです。

## Database Folder 設定手順

### 1. フォルダをデータベースに変換
1. StaffShifts フォルダを開く
2. コマンドパレット（Ctrl+P）→ `Database: Convert current folder to DB`
3. 確認ダイアログで「はい」を選択

### 2. Column 設定

| Column名      | Type   | 設定内容                 |
| ------------ | ------ | -------------------- |
| `date`       | Date   | フォーマット `yyyy-MM-dd`  |
| `shift_code` | Select | オプション: `A,B,C,D`     |
| `time`       | Text   | 時間範囲（例: 09:00-17:00） |
| `staffId`    | Text   | スタッフID（フィルター用）       |
| `title`      | Text   | スタッフ名（表示用）           |

### 3. ビュー設定
1. 画面右上「View」→「Calendar」を選択
2. **Date field**: `date` を選択
3. **Title field**: `title` を選択
4. カードに `shift_code` と `time` をバッジ表示

### 4. シフトコード説明
- **A**: 通常勤務（09:00-17:00）
- **B**: 午前休（13:00-17:00）
- **C**: 午後休（09:00-13:00）
- **D**: 完全休

## 使用方法

### 新規シフト追加
1. カレンダービューで空いている日をクリック
2. シフトコード（A/B/C/D）を選択
3. 必要に応じて時間を調整
4. 保存

### シフト変更
1. 既存のカードをクリック
2. 詳細を編集
3. 保存

### 日付移動
- カードをドラッグして別の日に移動
- YAML の `date:` が自動更新される 