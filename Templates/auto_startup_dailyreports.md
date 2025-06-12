<%*
// Obsidian起動時に今日と翌日の日報を自動生成

const today = tp.date.now("YYYY-MM-DD");
const tomorrow = tp.date.now("YYYY-MM-DD", "P1D");

// 今日の日報ファイル名
const todayFileName = `${today}_支援記録`;
const tomorrowFileName = `${tomorrow}_支援記録`;

// ファイルが既に存在するかチェック
const todayFile = app.vault.getAbstractFileByPath(`DailyReports/${todayFileName}.md`);
const tomorrowFile = app.vault.getAbstractFileByPath(`DailyReports/${tomorrowFileName}.md`);

// 今日の日報が存在しない場合は作成
if (!todayFile) {
    await tp.file.create_new(
        tp.file.find_tfile("daily_auto_generated"), 
        `DailyReports/${todayFileName}`,
        false,
        app.vault.getAbstractFileByPath("DailyReports")
    );
    console.log(`✅ 今日の日報を作成しました: ${todayFileName}`);
} else {
    console.log(`📋 今日の日報は既に存在します: ${todayFileName}`);
}

// 翌日の日報が存在しない場合は作成
if (!tomorrowFile) {
    await tp.file.create_new(
        tp.file.find_tfile("daily_auto_generated"), 
        `DailyReports/${tomorrowFileName}`,
        false,
        app.vault.getAbstractFileByPath("DailyReports")
    );
    console.log(`✅ 翌日の日報を作成しました: ${tomorrowFileName}`);
} else {
    console.log(`📋 翌日の日報は既に存在します: ${tomorrowFileName}`);
}

// 今日の日報を開く
const finalTodayFile = app.vault.getAbstractFileByPath(`DailyReports/${todayFileName}.md`);
if (finalTodayFile) {
    app.workspace.getLeaf().openFile(finalTodayFile);
}

// このテンプレートファイル自体は削除（一時的な実行用なので）
await tp.file.delete_file(tp.config.target_file);
%> 