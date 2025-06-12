## {{staff}} のシフト（月表示）

```full-calendar
folder: StaffShifts
titleFields:
  - shift_code
filters:
  staffId: {{staffId}}
initialView: dayGridMonth
slotDuration: 08:00:00
businessHours: 09:00-17:00
eventColor: "#4CAF50"
eventTextColor: "#FFFFFF"
weekends: true
```

### シフトコード説明
- **A**: 通常勤務（09:00-17:00）
- **B**: 午前休（13:00-17:00）
- **C**: 午後休（09:00-13:00）
- **D**: 完全休

### 操作方法
1. **シフト追加**: カレンダーの空いている日をクリック
2. **シフト変更**: 既存のイベントをクリックして編集
3. **日付移動**: イベントをドラッグして移動 