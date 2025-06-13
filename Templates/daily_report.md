---
date: "{{DATE:yyyy-MM-dd}}"
status: inactive
auto_generated: true
---

# {{DATE:yyyy年MM月dd日}}（{{DATE:dddd}}）支援記録

## 🔸 今日の出勤利用者

### 📋 出勤者一覧：

<div id="confirmed-users">
*[ここに予定表から取得された利用者が表示されます]*
</div>

<div class="interactive-section">

> [!info]- 🔹 追加で出勤する場合（クリックして展開）
> 
> <div id="additional-users" style="margin: 10px 0;">
> <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;">
> <label><input type="checkbox" value="山口恭平（やまぐち きょうへい）"> 山口恭平（やまぐち きょうへい）</label>
> <label><input type="checkbox" value="星野秀汰（ほしの しゅうた）"> 星野秀汰（ほしの しゅうた）</label>
> <label><input type="checkbox" value="服部郁子（はっとり いくこ）"> 服部郁子（はっとり いくこ）</label>
> <label><input type="checkbox" value="柿内環奈（かきうち かんな）"> 柿内環奈（かきうち かんな）</label>
> <label><input type="checkbox" value="水谷珠美（みずたに たまみ）"> 水谷珠美（みずたに たまみ）</label>
> <label><input type="checkbox" value="若林沙友里（わかばやし さゆり）"> 若林沙友里（わかばやし さゆり）</label>
> <label><input type="checkbox" value="長屋湧大（ながや わくた）"> 長屋湧大（ながや わくた）</label>
> <label><input type="checkbox" value="小林浩秋（こばやし ひろあき）"> 小林浩秋（こばやし ひろあき）</label>
> <label><input type="checkbox" value="高見昌宏（たかみ まさひろ）"> 高見昌宏（たかみ まさひろ）</label>
> <label><input type="checkbox" value="湯原優斗（ゆはら ゆうと）"> 湯原優斗（ゆはら ゆうと）</label>
> <label><input type="checkbox" value="高田美帆（たかだ みほ）※不定期"> 高田美帆（たかだ みほ）※不定期</label>
> <label><input type="checkbox" value="山本悠誠（やまもと ゆうせい）"> 山本悠誠（やまもと ゆうせい）</label>
> </div>
> </div>
> 
> <div style="text-align: center; margin: 15px 0;">
> <button onclick="confirmUsers()" class="confirm-btn confirm-btn-green">✅ 出勤者を確定</button>
> </div>

> [!warning]- ❌ 欠席者（クリックして展開）
> 
> <div id="absent-users" style="margin: 10px 0;">
> <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;">
> <label><input type="checkbox" value="山口恭平（やまぐち きょうへい）"> 山口恭平（やまぐち きょうへい）</label>
> <label><input type="checkbox" value="星野秀汰（ほしの しゅうた）"> 星野秀汰（ほしの しゅうた）</label>
> <label><input type="checkbox" value="服部郁子（はっとり いくこ）"> 服部郁子（はっとり いくこ）</label>
> <label><input type="checkbox" value="柿内環奈（かきうち かんな）"> 柿内環奈（かきうち かんな）</label>
> <label><input type="checkbox" value="水谷珠美（みずたに たまみ）"> 水谷珠美（みずたに たまみ）</label>
> <label><input type="checkbox" value="若林沙友里（わかばやし さゆり）"> 若林沙友里（わかばやし さゆり）</label>
> <label><input type="checkbox" value="長屋湧大（ながや わくた）"> 長屋湧大（ながや わくた）</label>
> <label><input type="checkbox" value="小林浩秋（こばやし ひろあき）"> 小林浩秋（こばやし ひろあき）</label>
> <label><input type="checkbox" value="高見昌宏（たかみ まさひろ）"> 高見昌宏（たかみ まさひろ）</label>
> <label><input type="checkbox" value="湯原優斗（ゆはら ゆうと）"> 湯原優斗（ゆはら ゆうと）</label>
> <label><input type="checkbox" value="高田美帆（たかだ みほ）※不定期"> 高田美帆（たかだ みほ）※不定期</label>
> <label><input type="checkbox" value="山本悠誠（やまもと ゆうせい）"> 山本悠誠（やまもと ゆうせい）</label>
> </div>
> </div>
> 
> <div style="text-align: center; margin: 15px 0;">
> <button onclick="confirmAbsentUsers()" class="confirm-btn confirm-btn-red">❌ 欠席者を確定</button>
> </div>

</div>

<div id="absent-list" style="display: none; margin-top: 20px; padding: 15px; background-color: #ffebee; border-left: 4px solid #f44336; border-radius: 4px;">
<h4 style="color: #c62828; margin: 0 0 10px 0;">❌ 確定済み欠席者：</h4>
<div id="confirmed-absent"></div>
</div>

## 🔸 今日の出勤スタッフ

### 📋 出勤スタッフ一覧：

<div id="confirmed-staff">
*[ここに予定表から取得されたスタッフが表示されます]*
</div>

<div class="interactive-section">

> [!info]- 🔹 追加で出勤する場合（クリックして展開）
> 
> <div id="additional-staff" style="margin: 10px 0;">
> <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;">
> <label><input type="checkbox" value="村田太志（早番）"> 村田太志（早番）</label>
> <label><input type="checkbox" value="松本愛美（遅番）"> 松本愛美（遅番）</label>
> <label><input type="checkbox" value="中井理恵"> 中井理恵</label>
> <label><input type="checkbox" value="小西瞳（小西ひとみ）"> 小西瞳（小西ひとみ）</label>
> <label><input type="checkbox" value="水谷麗香"> 水谷麗香</label>
> <label><input type="checkbox" value="吉澤冬美"> 吉澤冬美</label>
> <label><input type="checkbox" value="水戸紀昭（遅番）"> 水戸紀昭（遅番）</label>
> <label><input type="checkbox" value="木村菜々美"> 木村菜々美</label>
> <label><input type="checkbox" value="河相由梨奈"> 河相由梨奈</label>
> </div>
> </div>
> 
> <div style="text-align: center; margin: 15px 0;">
> <button onclick="confirmStaff()" class="confirm-btn confirm-btn-blue">✅ 出勤スタッフを確定</button>
> </div>

> [!warning]- ❌ 欠席スタッフ（クリックして展開）
> 
> <div id="absent-staff" style="margin: 10px 0;">
> <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;">
> <label><input type="checkbox" value="村田太志（早番）"> 村田太志（早番）</label>
> <label><input type="checkbox" value="松本愛美（遅番）"> 松本愛美（遅番）</label>
> <label><input type="checkbox" value="中井理恵"> 中井理恵</label>
> <label><input type="checkbox" value="小西瞳（小西ひとみ）"> 小西瞳（小西ひとみ）</label>
> <label><input type="checkbox" value="水谷麗香"> 水谷麗香</label>
> <label><input type="checkbox" value="吉澤冬美"> 吉澤冬美</label>
> <label><input type="checkbox" value="水戸紀昭（遅番）"> 水戸紀昭（遅番）</label>
> <label><input type="checkbox" value="木村菜々美"> 木村菜々美</label>
> <label><input type="checkbox" value="河相由梨奈"> 河相由梨奈</label>
> </div>
> </div>
> 
> <div style="text-align: center; margin: 15px 0;">
> <button onclick="confirmAbsentStaff()" class="confirm-btn confirm-btn-orange">❌ 欠席スタッフを確定</button>
> </div>

</div>

<div id="absent-staff-list" style="display: none; margin-top: 20px; padding: 15px; background-color: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px;">
<h4 style="color: #f57c00; margin: 0 0 10px 0;">❌ 確定済み欠席スタッフ：</h4>
<div id="confirmed-absent-staff"></div>
</div>

## 🔹 本日の作業内容（自由記載）

### 午前の作業（9:00-12:00）


### 午後の作業（13:00-15:30）


### その他の活動・特記事項


## 📝 スタッフ記入欄

### 本日の記録


### 申し送り事項


---

*記録者：＿＿＿＿＿＿＿*

*確認者：＿＿＿＿＿＿＿*

*このファイルは{{DATE:yyyy-MM-dd HH:mm}}に自動生成されました*

<style>
.confirm-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.confirm-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.confirm-btn-green {
    background-color: #4CAF50;
    color: white;
}

.confirm-btn-green:hover {
    background-color: #45a049;
}

.confirm-btn-red {
    background-color: #f44336;
    color: white;
}

.confirm-btn-red:hover {
    background-color: #da190b;
}

.confirm-btn-blue {
    background-color: #2196F3;
    color: white;
}

.confirm-btn-blue:hover {
    background-color: #0b7dda;
}

.confirm-btn-orange {
    background-color: #ff9800;
    color: white;
}

.confirm-btn-orange:hover {
    background-color: #e68900;
}

.interactive-section label {
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 2px 0;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    cursor: pointer;
}

.interactive-section label:hover {
    background-color: #f5f5f5;
}

.interactive-section input[type="checkbox"] {
    margin-right: 8px;
    transform: scale(1.2);
}
</style>

<script>
// 利用者出勤確定
function confirmUsers() {
    const additionalDiv = document.getElementById('additional-users');
    const confirmedDiv = document.getElementById('confirmed-users');
    const checkboxes = additionalDiv.querySelectorAll('input[type="checkbox"]:checked');
    
    let additionalUsers = [];
    
    checkboxes.forEach(checkbox => {
        additionalUsers.push(`• ${checkbox.value}`);
    });
    
    if (additionalUsers.length > 0) {
        const currentContent = confirmedDiv.innerHTML;
        const newContent = currentContent + '\n\n**🆕 追加出勤者:**\n' + additionalUsers.join('\n');
        confirmedDiv.innerHTML = newContent;
        
        // チェックボックスをリセット
        checkboxes.forEach(checkbox => checkbox.checked = false);
        
        // 親の展開部分を閉じる
        const parentCallout = additionalDiv.closest('[data-callout]');
        if (parentCallout) {
            parentCallout.querySelector('summary')?.click();
        }
        
        alert(`✅ ${additionalUsers.length}名の出勤者を確定しました！`);
    } else {
        alert('⚠️ チェックされた項目がありません。');
    }
}

// 利用者欠席確定
function confirmAbsentUsers() {
    const absentDiv = document.getElementById('absent-users');
    const confirmedAbsentDiv = document.getElementById('confirmed-absent');
    const absentListDiv = document.getElementById('absent-list');
    const checkboxes = absentDiv.querySelectorAll('input[type="checkbox"]:checked');
    
    let absentUsers = [];
    
    checkboxes.forEach(checkbox => {
        absentUsers.push(`• ${checkbox.value}`);
    });
    
    if (absentUsers.length > 0) {
        confirmedAbsentDiv.innerHTML = absentUsers.join('\n');
        absentListDiv.style.display = 'block';
        
        // チェックボックスをリセット
        checkboxes.forEach(checkbox => checkbox.checked = false);
        
        // 親の展開部分を閉じる
        const parentCallout = absentDiv.closest('[data-callout]');
        if (parentCallout) {
            parentCallout.querySelector('summary')?.click();
        }
        
        alert(`❌ ${absentUsers.length}名の欠席者を確定しました！`);
    } else {
        alert('⚠️ チェックされた項目がありません。');
    }
}

// スタッフ出勤確定
function confirmStaff() {
    const additionalDiv = document.getElementById('additional-staff');
    const confirmedDiv = document.getElementById('confirmed-staff');
    const checkboxes = additionalDiv.querySelectorAll('input[type="checkbox"]:checked');
    
    let additionalStaff = [];
    
    checkboxes.forEach(checkbox => {
        additionalStaff.push(`• ${checkbox.value}`);
    });
    
    if (additionalStaff.length > 0) {
        const currentContent = confirmedDiv.innerHTML;
        const newContent = currentContent + '\n\n**🆕 追加出勤者:**\n' + additionalStaff.join('\n');
        confirmedDiv.innerHTML = newContent;
        
        // チェックボックスをリセット
        checkboxes.forEach(checkbox => checkbox.checked = false);
        
        // 親の展開部分を閉じる
        const parentCallout = additionalDiv.closest('[data-callout]');
        if (parentCallout) {
            parentCallout.querySelector('summary')?.click();
        }
        
        alert(`✅ ${additionalStaff.length}名の出勤スタッフを確定しました！`);
    } else {
        alert('⚠️ チェックされた項目がありません。');
    }
}

// スタッフ欠席確定
function confirmAbsentStaff() {
    const absentDiv = document.getElementById('absent-staff');
    const confirmedAbsentDiv = document.getElementById('confirmed-absent-staff');
    const absentListDiv = document.getElementById('absent-staff-list');
    const checkboxes = absentDiv.querySelectorAll('input[type="checkbox"]:checked');
    
    let absentStaff = [];
    
    checkboxes.forEach(checkbox => {
        absentStaff.push(`• ${checkbox.value}`);
    });
    
    if (absentStaff.length > 0) {
        confirmedAbsentDiv.innerHTML = absentStaff.join('\n');
        absentListDiv.style.display = 'block';
        
        // チェックボックスをリセット
        checkboxes.forEach(checkbox => checkbox.checked = false);
        
        // 親の展開部分を閉じる
        const parentCallout = absentDiv.closest('[data-callout]');
        if (parentCallout) {
            parentCallout.querySelector('summary')?.click();
        }
        
        alert(`❌ ${absentStaff.length}名の欠席スタッフを確定しました！`);
    } else {
        alert('⚠️ チェックされた項目がありません。');
    }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ インタラクティブデイリーレポート初期化完了');
});
</script> 