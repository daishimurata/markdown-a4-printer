---
date: "{{DATE:YYYY-MM-DD}}"
status: inactive
auto_generated: true
---

# {{DATE:YYYY年MM月DD日}}（{{DATE:dddd}}）支援記録

## 🔸 今日の出勤利用者

### 📋 出勤者一覧：

<%* 
// 今日の日付を取得
const today = tp.date.now("YYYY-MM-DD");

// 利用者フォルダからファイルを取得
const peopleFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("People/"));
const todayUsers = [];

for (let file of peopleFiles) {
    const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
    
    if (frontmatter?.schedule && frontmatter.schedule.some(date => 
        date && date.toString().includes(today)
    )) {
        const name = file.basename;
        const kana = frontmatter.kana || "";
        todayUsers.push(`• ${name}（${kana}）`);
    }
}

if (todayUsers.length > 0) {
    tR += todayUsers.join('\n');
} else {
    tR += "予定表から取得された利用者はありません";
}
%>

> [!info]- 🔹 追加で出勤する場合（クリックして展開）
> - [ ] 山口恭平（やまぐち きょうへい）
> - [ ] 星野秀汰（ほしの しゅうた）
> - [ ] 服部郁子（はっとり いくこ）
> - [ ] 柿内環奈（かきうち かんな）
> - [ ] 水谷珠美（みずたに たまみ）
> - [ ] 若林沙友里（わかばやし さゆり）
> - [ ] 長屋湧大（ながや わくた）
> - [ ] 小林浩秋（こばやし ひろあき）
> - [ ] 高見昌宏（たかみ まさひろ）
> - [ ] 湯原優斗（ゆはら ゆうと）
> - [ ] 高田美帆（たかだ みほ）※不定期

> [!warning]- ❌ 欠席者（クリックして展開）
> - [ ] 山口恭平（やまぐち きょうへい）
> - [ ] 星野秀汰（ほしの しゅうた）
> - [ ] 服部郁子（はっとり いくこ）
> - [ ] 柿内環奈（かきうち かんな）
> - [ ] 水谷珠美（みずたに たまみ）
> - [ ] 若林沙友里（わかばやし さゆり）
> - [ ] 長屋湧大（ながや わくた）
> - [ ] 小林浩秋（こばやし ひろあき）
> - [ ] 高見昌宏（たかみ まさひろ）
> - [ ] 湯原優斗（ゆはら ゆうと）
> - [ ] 高田美帆（たかだ みほ）※不定期

## 🔸 今日の出勤スタッフ

### 📋 出勤スタッフ一覧：

<%*
// スタッフフォルダからファイルを取得
const staffFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Staff/"));
const todayStaff = [];

for (let file of staffFiles) {
    const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
    
    if (frontmatter?.shift) {
        const todayShift = frontmatter.shift.find(shift => 
            shift && shift.toString().includes(today)
        );
        if (todayShift) {
            const shiftType = todayShift.toString().split(' ')[1];
            const shiftName = shiftType === 'A' ? '（早番）' : 
                             shiftType === 'B' ? '（遅番）' : '';
            if (shiftType !== 'C') {
                const name = file.basename;
                todayStaff.push(`• ${name}${shiftName}`);
            }
        }
    }
}

if (todayStaff.length > 0) {
    tR += todayStaff.join('\n');
} else {
    tR += "予定表から取得されたスタッフはありません";
}
%>

> [!info]- 🔹 追加で出勤する場合（クリックして展開）
> - [ ] 村田太志（早番）
> - [ ] 松本愛美（遅番）
> - [ ] 中井理恵
> - [ ] 小西瞳（小西ひとみ）
> - [ ] 水谷麗香
> - [ ] 吉澤冬美
> - [ ] 水戸紀昭（遅番）
> - [ ] 木村菜々美
> - [ ] 河相由梨奈

> [!warning]- ❌ 欠席スタッフ（クリックして展開）
> - [ ] 村田太志（早番）
> - [ ] 松本愛美（遅番）
> - [ ] 中井理恵
> - [ ] 小西瞳（小西ひとみ）
> - [ ] 水谷麗香
> - [ ] 吉澤冬美
> - [ ] 水戸紀昭（遅番）
> - [ ] 木村菜々美
> - [ ] 河相由梨奈

## 🔹 本日の作業内容（自由記載）

### 午前の作業（9:00-12:00）


### 午後の作業（13:00-15:30）


### その他の活動・特記事項


## 📝 スタッフ記入欄

### 本日の記録


### 申し送り事項


---

## 🎤 ChatGPT用プロンプト（自動生成・コピー用）

```
以下の{{DATE:YYYY年MM月DD日}}の日報内容を、利用者ごとの個別記録として整理してください。

【基本情報】
日付：{{DATE:YYYY年MM月DD日}}
記録者：[スタッフ名を記入してください]

【出勤利用者】
<%*
// ChatGPT用の利用者リスト（静的出力）
const today = tp.date.now("YYYY-MM-DD");
const peopleFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("People/"));
const todayUsers = [];

for (let file of peopleFiles) {
    const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
    
    if (frontmatter?.schedule && frontmatter.schedule.some(date => 
        date && date.toString().includes(today)
    )) {
        const name = file.basename;
        const kana = frontmatter.kana || "";
        todayUsers.push(`• ${name}（${kana}）`);
    }
}

if (todayUsers.length > 0) {
    tR += todayUsers.join('\n');
} else {
    tR += "予定表から取得された利用者はありません";
}
%>

追加出勤：[チェックした場合はここに記載]
欠席者：[チェックした場合はここに記載]

【出勤スタッフ】
<%*
// ChatGPT用のスタッフリスト（静的出力）
const staffFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Staff/"));
const todayStaff = [];

for (let file of staffFiles) {
    const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
    
    if (frontmatter?.shift) {
        const todayShift = frontmatter.shift.find(shift => 
            shift && shift.toString().includes(today)
        );
        if (todayShift) {
            const shiftType = todayShift.toString().split(' ')[1];
            const shiftName = shiftType === 'A' ? '（早番）' : 
                             shiftType === 'B' ? '（遅番）' : '';
            if (shiftType !== 'C') {
                const name = file.basename;
                todayStaff.push(`• ${name}${shiftName}`);
            }
        }
    }
}

if (todayStaff.length > 0) {
    tR += todayStaff.join('\n');
} else {
    tR += "予定表から取得されたスタッフはありません";
}
%>

追加出勤：[チェックした場合はここに記載]
欠席スタッフ：[チェックした場合はここに記載]

【作業内容】
[本日の作業内容をここに貼り付け]

【スタッフ記入内容】
[本日の記録をここに貼り付け]

【申し送り事項】
[申し送り事項をここに貼り付け]

---

上記の情報を基に、以下の形式で整理してください：

1. **利用者ごとの個別記録**として分類
2. **スタッフが話した内容**を各利用者の記録に振り分け
3. **出力形式**：
   ```
   【{{DATE:YYYY年MM月DD日}} 利用者別記録】
   記録者：[記録したスタッフ名]
   
   ■ [利用者名1]
   ・様子/変化：
   ・良かった点：
   ・気づき/課題：
   
   ■ [利用者名2]
   ・様子/変化：
   ・良かった点：
   ・気づき/課題：
   
   【申し送り事項】
   ・
   
   【記録者情報】
   作成者：[スタッフ名]
   作成日：{{DATE:YYYY年MM月DD日}}
   ```

4. **必須事項**：
   - 必ず出力の最後に「記録者：[スタッフ名]」を明記
   - 利用者ごとに情報を整理
   - 重要な申し送り事項は別途ハイライト
```

---

**記録者**: 　　　　　　　　**確認者**: 　　　　　　　　**日付**: {{DATE:YYYY-MM-DD}}

*このファイルは{{DATE:YYYY-MM-DD HH:mm}}に自動生成されました* 