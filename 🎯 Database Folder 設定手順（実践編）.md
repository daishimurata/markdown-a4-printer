# 🎯 Database Folder 設定手順（実践編）

## 前提条件
- Database Folder プラグインがインストール・有効化済み
- StaffShifts フォルダに4つのサンプルファイルが存在

## Step 1: フォルダをデータベースに変換

### 操作手順
1. **StaffShifts フォルダを開く**
2. **Ctrl+P** でコマンドパレットを開く
3. 「**db folder**」と入力して検索
4. 「**Database Folder: Convert current folder to database**」を選択
5. 確認ダイアログで「**OK**」をクリック

### 変換後の確認
```
✅ フォルダ名の横にデータベースアイコン（📊）が表示
✅ 上部にDatabase Folderのツールバーが表示
✅ ファイル一覧がテーブル形式で表示
```

## Step 2: Column（列）設定

### 2-1. 設定画面を開く
1. StaffShifts フォルダで **右クリック**
2. **「Database Folder Settings」** を選択
3. **「Columns」** タブをクリック

### 2-2. 自動検出された列の確認
初回は以下の列が自動検出されます：
- `title` (Text)
- `staffId` (Text) 
- `date` (Text) ← **これを Date型に変更が必要**
- `shift_code` (Text) ← **これを Select型に変更が必要**
- `time` (Text)

### 2-3. date列の設定変更
1. **date** 行の **「Edit」** ボタンをクリック
2. 設定を以下のように変更：
```
Column Name: date
Column Type: Date
Date Format: yyyy-MM-dd
Is Required: ✅ ON
Default Value: (空白)
```
3. **「Save」** をクリック

### 2-4. shift_code列の設定変更
1. **shift_code** 行の **「Edit」** ボタンをクリック
2. 設定を以下のように変更：
```
Column Name: shift_code
Column Type: Select
Options:
  A | 通常勤務 | #4CAF50
  B | 午前休   | #2196F3  
  C | 午後休   | #FF9800
  D | 完全休   | #9E9E9E
Is Required: ✅ ON
Default Value: A
```
3. **「Save」** をクリック

### 2-5. title列の設定調整
1. **title** 行の **「Edit」** ボタンをクリック
2. 設定を以下のように変更：
```
Column Name: title
Column Type: Text
Is Required: ✅ ON
Max Length: 50
```
3. **「Save」** をクリック

### 2-6. staffId列の設定調整
1. **staffId** 行の **「Edit」** ボタンをクリック
2. 設定を以下のように変更：
```
Column Name: staffId
Column Type: Text
Is Required: ✅ ON
Max Length: 10
Validation Pattern: S[0-9]{3}
```
3. **「Save」** をクリック

## Step 3: View（表示）設定

### 3-1. Calendar Viewの有効化
1. **「Views」** タブをクリック
2. **「Add View」** ボタンをクリック
3. 以下の設定を入力：
```
View Name: Calendar
View Type: Calendar
Is Default: ✅ ON
```

### 3-2. Calendar設定の詳細
```
Date Field: date
Title Field: title
Color Field: shift_code
Initial View: dayGridMonth
First Day of Week: 1 (月曜日)
Business Hours Start: 09:00
Business Hours End: 17:00
Weekend Display: ✅ ON
```

### 3-3. Event Display設定
```
Primary Display: title
Secondary Display: time
Badge Display: shift_code
```

## Step 4: Filter（フィルター）設定

### 4-1. Quick Filtersの追加
1. **「Filters」** タブをクリック
2. **「Add Quick Filter」** をクリック
3. 以下のフィルターを追加：

#### 今日のシフト
```
Filter Name: 今日のシフト
Field: date
Operator: equals
Value: {{TODAY}}
```

#### 今週のシフト
```
Filter Name: 今週のシフト
Field: date
Operator: between
Start Value: {{WEEK_START}}
End Value: {{WEEK_END}}
```

#### 通常勤務のみ
```
Filter Name: 通常勤務のみ
Field: shift_code
Operator: equals
Value: A
```

## Step 5: Template（テンプレート）設定

### 5-1. 新規ファイルテンプレート
1. **「Templates」** タブをクリック
2. **「New File Template」** セクションで以下を設定：

```yaml
---
title: "{{prompt:スタッフ名}}"
staffId: "{{prompt:スタッフID}}"
date: "{{date:YYYY-MM-DD}}"
shift_code: "{{suggest:A,B,C,D}}"
time: "{{prompt:時間|09:00-17:00}}"
---
# シフトメモ（任意）
{{prompt:メモ}}
```

### 5-2. ファイル名設定
```
File Name Pattern: {{title}}_{{date}}
Auto Rename: ✅ ON
Conflict Resolution: append_number
```

## Step 6: 動作テスト

### 6-1. カレンダー表示テスト
1. **「Calendar」** ビューを選択
2. 既存のイベントが正しく表示されることを確認
3. 色分けが設定通りに表示されることを確認

### 6-2. 新規イベント作成テスト
1. カレンダーの空白日をクリック
2. 新規イベント作成ダイアログが表示されることを確認
3. 各フィールドが設定通りに動作することを確認

### 6-3. 編集機能テスト
1. 既存のイベントをクリック
2. 編集ダイアログが表示されることを確認
3. 変更が正しく保存されることを確認

### 6-4. フィルター機能テスト
1. 「今日のシフト」フィルターをクリック
2. 該当するイベントのみ表示されることを確認
3. フィルターをクリアして全表示に戻ることを確認

## Step 7: 最終確認チェックリスト

### Database設定
- [ ] フォルダがデータベースに変換されている
- [ ] 全ての列が正しく設定されている
- [ ] データ型が適切に設定されている

### Calendar表示
- [ ] イベントが正しい日付に表示されている
- [ ] 色分けが機能している
- [ ] 月の切り替えが正常に動作する

### CRUD操作
- [ ] 新規作成（Create）が正常に動作
- [ ] 表示（Read）が正常に動作
- [ ] 編集（Update）が正常に動作
- [ ] 削除（Delete）が正常に動作

### フィルター機能
- [ ] Quick Filtersが正常に動作
- [ ] 複数フィルターの組み合わせが動作
- [ ] フィルターのリセットが動作

## トラブルシューティング

### ❌ カレンダーが表示されない
**原因**: date フィールドの型が正しくない
**解決策**: Column設定で date を Date型に変更

### ❌ 色分けが効かない
**原因**: shift_code の選択肢が正しく設定されていない
**解決策**: Select型のオプションに色コードを設定

### ❌ 新規作成でエラーが発生
**原因**: テンプレートの構文エラー
**解決策**: YAML構文とプレースホルダーを確認

### ❌ フィルターが動作しない
**原因**: フィールド名が一致していない
**解決策**: 実際の列名とフィルター設定を確認

## 次のステップ
設定完了後は、残りのスタッフファイルを更新し、Full Calendar プラグインとの連携を設定してください。 