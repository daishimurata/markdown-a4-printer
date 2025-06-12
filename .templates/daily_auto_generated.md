---
date: "<% tp.date.now("YYYY-MM-DD") %>"
status: inactive
auto_generated: true
---

# <% tp.date.now("YYYY年MM月DD日") %>（<% tp.date.now("dddd", "ja") %>）支援記録

## 🔸 今日の出勤利用者（自動生成）

```dataviewjs
const today = "<% tp.date.now("YYYY-MM-DD") %>";
const users = dv.pages('"People"').where(p => 
    p.schedule && p.schedule.some(date => 
        date && date.toString().includes(today)
    )
);

if (users.length > 0) {
    for (let user of users) {
        dv.el("div", `- [x] ${user.file.name}（${user.kana || ""}）`);
    }
} else {
    dv.el("div", "本日の出勤予定利用者はありません");
}
```

**手動確認用（データが取得できない場合）:**
- [ ] 山口恭平（やまぐち きょうへい）
- [ ] 星野秀汰（ほしの しゅうた）
- [ ] 服部郁子（はっとり いくこ）
- [ ] 柿内環奈（かきうち かんな）
- [ ] 水谷珠美（みずたに たまみ）
- [ ] 若林沙友里（わかばやし さゆり）
- [ ] 長屋湧大（ながや わくた）
- [ ] 小林浩秋（こばやし ひろあき）
- [ ] 高見昌宏（たかみ まさひろ）
- [ ] 湯原優斗（ゆはら ゆうと）
- [ ] 高田美帆（たかだ みほ）※不定期

## 🔸 今日の出勤スタッフ（自動生成）

```dataviewjs
const today = "<% tp.date.now("YYYY-MM-DD") %>";
const staff = dv.pages('"Staff"').where(s => 
    s.shift && s.shift.some(shift => 
        shift && shift.toString().includes(today)
    )
);

if (staff.length > 0) {
    for (let member of staff) {
        const todayShift = member.shift.find(shift => 
            shift && shift.toString().includes(today)
        );
        const shiftType = todayShift ? todayShift.toString().split(' ')[1] : '';
        const shiftName = shiftType === 'A' ? '（早番）' : 
                         shiftType === 'B' ? '（遅番）' : 
                         shiftType === 'C' ? '（休み）' : '';
        
        if (shiftType !== 'C') {
            dv.el("div", `- [x] ${member.file.name}${shiftName}`);
        }
    }
} else {
    dv.el("div", "本日の出勤予定スタッフはありません");
}
```

**手動確認用（データが取得できない場合）:**
- [ ] 村田太志（早番）
- [ ] 松本愛美（遅番）
- [ ] 中井理恵
- [ ] 小西瞳（小西ひとみ）
- [ ] 水谷麗香
- [ ] 吉澤冬美
- [ ] 水戸紀昭（遅番）
- [ ] 木村菜々美
- [ ] 河相由梨奈

## 🔹 週間スケジュール概要

```dataviewjs
const startOfWeek = moment("<% tp.date.now("YYYY-MM-DD") %>").startOf('week');
const endOfWeek = moment("<% tp.date.now("YYYY-MM-DD") %>").endOf('week');

dv.el("h4", "今週の利用者予定");
const users = dv.pages('"People"').where(p => p.schedule);
for (let user of users) {
    const weekSchedule = user.schedule.filter(date => {
        const scheduleDate = moment(date.toString());
        return scheduleDate.isBetween(startOfWeek, endOfWeek, null, '[]');
    });
    
    if (weekSchedule.length > 0) {
        dv.el("div", `**${user.file.name}**: ${weekSchedule.map(d => moment(d.toString()).format('MM/DD(ddd)')).join(', ')}`);
    }
}
```

## 🔹 本日の作業内容

| 時間 | 作業 | 担当 | 参加利用者 | メモ |
|------|------|------|------------|------|
| 9:00-9:30  | 朝礼・体調確認 |  |  |  |
| 9:30-12:00 | 午前作業 |  |  |  |
| 12:00-13:00 | 昼食・休憩 |  |  |  |
| 13:00-15:30 | 午後作業 |  |  |  |
| 15:30-16:00 | 掃除・終礼 |  |  |  |
| 16:00-17:00 | 記録整理 |  |  |  |

## 🔹 気づきメモ

### 利用者の様子・変化


### 今日の良かった点


### 改善点・課題


### 申し送り事項


---

**記録者**: 　　　　　　　　**確認者**: 　　　　　　　　**日付**: <% tp.date.now("YYYY-MM-DD") %>

*このファイルは自動生成されました - <% tp.date.now("YYYY-MM-DD HH:mm") %>* 