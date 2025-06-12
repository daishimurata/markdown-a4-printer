<%*
// 今日と翌日の日報を自動作成するスクリプト

async function createDailyReports() {
    try {
        // 今日と翌日の日付を取得
        const today = tp.date.now("YYYY-MM-DD");
        const tomorrow = tp.date.now("YYYY-MM-DD", "P1D");
        
        console.log(`今日の日付: ${today}`);
        console.log(`翌日の日付: ${tomorrow}`);
        
        // ファイル名を作成
        const todayFileName = `${today}_支援記録`;
        const tomorrowFileName = `${tomorrow}_支援記録`;
        
        // DailyReportsフォルダを取得
        const dailyReportsFolder = app.vault.getAbstractFileByPath("DailyReports");
        if (!dailyReportsFolder) {
            new Notice("DailyReportsフォルダが見つかりません");
            return;
        }
        
        // テンプレートファイルを取得
        const templateFile = tp.file.find_tfile("daily_auto_generated");
        if (!templateFile) {
            new Notice("daily_auto_generated テンプレートが見つかりません");
            return;
        }
        
        // 今日の日報をチェック・作成
        const todayPath = `DailyReports/${todayFileName}.md`;
        const todayFile = app.vault.getAbstractFileByPath(todayPath);
        
        if (!todayFile) {
            console.log(`今日の日報を作成中: ${todayFileName}`);
            await tp.file.create_new(
                templateFile,
                todayFileName,
                false,
                dailyReportsFolder
            );
            console.log(`✅ 今日の日報を作成しました: ${todayFileName}`);
            new Notice(`今日の日報を作成しました: ${today}`);
        } else {
            console.log(`📋 今日の日報は既に存在します: ${todayFileName}`);
        }
        
        // 翌日の日報をチェック・作成
        const tomorrowPath = `DailyReports/${tomorrowFileName}.md`;
        const tomorrowFile = app.vault.getAbstractFileByPath(tomorrowPath);
        
        if (!tomorrowFile) {
            console.log(`翌日の日報を作成中: ${tomorrowFileName}`);
            
            // 翌日用の日付でテンプレートを処理するために、一時的に日付を変更
            const originalDate = tp.date.now;
            tp.date.now = (format, offset = "P0D") => {
                if (offset === "P0D" || !offset) {
                    return tp.date.now(format, "P1D");
                }
                return originalDate(format, offset);
            };
            
            await tp.file.create_new(
                templateFile,
                tomorrowFileName,
                false,
                dailyReportsFolder
            );
            
            // 日付関数を元に戻す
            tp.date.now = originalDate;
            
            console.log(`✅ 翌日の日報を作成しました: ${tomorrowFileName}`);
            new Notice(`翌日の日報を作成しました: ${tomorrow}`);
        } else {
            console.log(`📋 翌日の日報は既に存在します: ${tomorrowFileName}`);
        }
        
        // 今日の日報を開く
        const finalTodayFile = app.vault.getAbstractFileByPath(todayPath);
        if (finalTodayFile) {
            await app.workspace.getLeaf().openFile(finalTodayFile);
        }
        
        // 最終的な成功メッセージ
        new Notice(`日報作成完了✅`);
        
    } catch (error) {
        console.error("日報作成エラー:", error);
        new Notice(`エラーが発生しました: ${error.message}`);
    }
}

// 関数を実行
await createDailyReports();

// このテンプレートファイルを閉じる（実行用なので）
setTimeout(() => {
    if (tp.config.target_file) {
        app.workspace.getLeaf().detach();
    }
}, 1000);
%> 