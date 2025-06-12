# <% tp.date.now("YYYY年MM月DD日") %> (<% tp.date.now("dddd", "", null, "ja") %>) 支援記録

## プロパティ
- date:: <% tp.date.now("YYYY-MM-DD") %>
- type:: daily-report
- auto-generated:: ✅

---

## <% tp.date.now("YYYY年MM月DD日") %>の出勤利用者

```dataviewjs
const today = "<% tp.date.now("YYYY-MM-DD") %>";
const users = dv.pages('"People"').where(p => 
    p.schedule && p.schedule.some(date => 
        date && date.toString().includes(today)
    )
);
if (users.length > 0) {
    dv.el("h3", "📋 出勤予定者一覧:");
    for (let user of users) {
        dv.el("li", `${user.file.name}（${user.kana || ""}）`);
    }
} else {
    dv.el("p", "予定表から取得された利用者はありません");
}
```

### [!info]- 出勤追加 (クリックして展開)
- [ ] 出勤者名を記入してください
<!-- 実際に出勤した方がいれば、上記にチェックを入れて名前を記入してください -->

### [!warning]- 欠勤・変更 (クリックして展開)  
- [ ] 欠勤者名を記入してください
<!-- 予定と異なる場合は、上記にチェックを入れて詳細を記入してください -->

---

## <% tp.date.now("YYYY年MM月DD日") %>の職員勤務

```dataviewjs
const today = "<% tp.date.now("YYYY-MM-DD") %>";
const staff = dv.pages('"Staff"').where(s => 
    s.shift && s.shift.some(shift => 
        shift && shift.toString().includes(today)
    )
);
if (staff.length > 0) {
    dv.el("h3", "👥 勤務予定スタッフ:");
    for (let member of staff) {
        const todayShift = member.shift.find(shift => 
            shift && shift.toString().includes(today)
        );
        const shiftType = todayShift ? todayShift.toString().split(' ')[1] : '';
        const shiftName = shiftType === 'A' ? '（早番）' : 
                         shiftType === 'B' ? '（遅番）' : '';
        if (shiftType !== 'C') {
            dv.el("li", `${member.file.name}${shiftName}`);
        }
    }
} else {
    dv.el("p", "予定表から取得されたスタッフはありません");
}
```

### [!info]- 勤務追加・変更 (クリックして展開)
- [ ] 追加勤務者や変更があれば記入してください
<!-- 予定と異なる勤務がある場合は、上記にチェックを入れて詳細を記入してください -->

---

## 本日の記録

<!-- ここに一日の活動や特記事項を記入してください -->
<!-- 例：○○さんの体調について、△△の活動で良い反応がありました等 -->

---

## ChatGPT処理用プロンプト

```
以下の<% tp.date.now("YYYY年MM月DD日") %>の日報内容を、利用者ごとの個別記録として整理してください。

【基本情報】
日付：<% tp.date.now("YYYY年MM月DD日") %>
記録者：[スタッフ名を記入してください]

【出勤利用者】
<%*
// 今日の出勤予定利用者を静的に表示
const today = tp.date.now("YYYY-MM-DD");
const peopleFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("People/"));
const todayUsers = [];

for (let file of peopleFiles) {
    const content = await app.vault.read(file);
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
// 今日の勤務予定スタッフを静的に表示
const today = tp.date.now("YYYY-MM-DD");
const staffFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Staff/"));
const todayStaff = [];

for (let file of staffFiles) {
    const content = await app.vault.read(file);
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
   【<% tp.date.now("YYYY年MM月DD日") %> 利用者別記録】
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
   作成日：<% tp.date.now("YYYY年MM月DD日") %>
   ```

4. **必須事項**：
   - 必ず出力の最後に「記録者：[スタッフ名]」を明記
   - 利用者ごとに情報を整理
   - 重要な申し送り事項は別途ハイライト
```

---

**記録者**: 　　　　　　　　**確認者**: 　　　　　　　　**日付**: <% tp.date.now("YYYY-MM-DD") %>

*このファイルは自動生成されました - <% tp.date.now("YYYY-MM-DD HH:mm") %>* 