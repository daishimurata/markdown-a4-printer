# <% tp.date.now("YYYY年MM月DD日", "P1D") %> (<% tp.date.now("dddd", "P1D", null, "ja") %>) 支援記録

## プロパティ
- date:: <% tp.date.now("YYYY-MM-DD", "P1D") %>
- type:: daily-report
- auto-generated:: ✅

---

## <% tp.date.now("YYYY年MM月DD日", "P1D") %>の出勤利用者

```dataviewjs
// 翌日の日付を取得
const tomorrow = "<% tp.date.now("YYYY-MM-DD", "P1D") %>";

// Peopleフォルダから明日のスケジュールがある利用者を検索
const people = dv.pages('"People"')
    .where(p => p.schedule && p.schedule.some(date => 
        date && date.toString().includes(tomorrow)
    ))
    .map(p => ({ name: p.file.name, kana: p.kana || "" }))
    .sort(p => p.name);

if (people.length > 0) {
    dv.el("h3", "📋 出勤予定者一覧:");
    people.forEach(person => {
        dv.el("li", `${person.name}（${person.kana}）`);
    });
} else {
    dv.el("p", "明日の出勤予定者はいません。");
}
```

### [!info]- 出勤追加 (クリックして展開)
- [ ] 出勤者名を記入してください
<!-- 実際に出勤した方がいれば、上記にチェックを入れて名前を記入してください -->

### [!warning]- 欠勤・変更 (クリックして展開)  
- [ ] 欠勤者名を記入してください
<!-- 予定と異なる場合は、上記にチェックを入れて詳細を記入してください -->

---

## <% tp.date.now("YYYY年MM月DD日", "P1D") %>の職員勤務

```dataviewjs
// 翌日の日付を取得
const tomorrow = "<% tp.date.now("YYYY-MM-DD", "P1D") %>";

// Staffフォルダから明日のシフトがあるスタッフを検索
const staff = dv.pages('"Staff"')
    .map(p => {
        if (p.shift) {
            const tomorrowShift = p.shift.find(shift => 
                shift && shift.toString().includes(tomorrow)
            );
            if (tomorrowShift) {
                const shiftType = tomorrowShift.toString().split(' ')[1];
                const shiftName = shiftType === 'A' ? '早番' : 
                                shiftType === 'B' ? '遅番' : '休み';
                return { name: p.file.name, shift: shiftName, code: shiftType };
            }
        }
        return null;
    })
    .where(s => s !== null && s.code !== 'C')
    .sort(s => s.shift);

if (staff.length > 0) {
    dv.el("h3", "👥 勤務予定スタッフ:");
    staff.forEach(s => {
        dv.el("li", `${s.name} - ${s.shift}`);
    });
} else {
    dv.el("p", "明日の勤務予定スタッフ情報がありません。");
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
本日（<% tp.date.now("YYYY年MM月DD日", "P1D") %>）の支援記録を個人別に整理してください。

**出勤者情報：**
<%*
// 翌日の出勤予定利用者を静的に表示（ChatGPT用）
const tomorrow = tp.date.now("YYYY-MM-DD", "P1D");
const peopleFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("People/"));
const tomorrowUsers = [];

for (let file of peopleFiles) {
    const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
    
    if (frontmatter?.schedule && frontmatter.schedule.some(date => 
        date && date.toString().includes(tomorrow)
    )) {
        const name = file.basename;
        const kana = frontmatter.kana || "";
        tomorrowUsers.push(`• ${name}（${kana}）`);
    }
}

if (tomorrowUsers.length > 0) {
    tR += tomorrowUsers.join('\n');
} else {
    tR += "出勤予定者情報なし";
}
%>

**スタッフ情報：**
<%*
// 翌日の勤務予定スタッフを静的に表示（ChatGPT用）
const tomorrow = tp.date.now("YYYY-MM-DD", "P1D");
const staffFiles = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Staff/"));
const tomorrowStaff = [];

for (let file of staffFiles) {
    const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
    
    if (frontmatter?.shift) {
        const tomorrowShift = frontmatter.shift.find(shift => 
            shift && shift.toString().includes(tomorrow)
        );
        if (tomorrowShift) {
            const shiftType = tomorrowShift.toString().split(' ')[1];
            const shiftName = shiftType === 'A' ? '早番' : 
                             shiftType === 'B' ? '遅番' : '';
            if (shiftType !== 'C') {
                const name = file.basename;
                tomorrowStaff.push(`• ${name} (${shiftName})`);
            }
        }
    }
}

if (tomorrowStaff.length > 0) {
    tR += tomorrowStaff.join('\n');
} else {
    tR += "スタッフ勤務情報なし";
}
%>

**記録内容：**
[上記の「本日の記録」セクションの内容をここにコピーしてください]

**指示：**
1. 各利用者ごとに個別の記録を作成
2. 記録内容にスタッフ名を含めて記載
3. 以下の形式で出力：

### [利用者名]
- **記録者：** [担当スタッフ名]
- **内容：** [具体的な記録内容]
- **特記事項：** [必要に応じて] 