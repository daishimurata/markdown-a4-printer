---

database-plugin: basic

---
name: "StaffShifts"
description: "スタッフシフト管理データベース"
version: "4.0"

# Database Settings
database:
  source_data: "folder"
  source_form_result: "yaml"
  local_settings:
    show_metadata: true
    enable_js: true
    group_folder_column: ""
    remove_field_when_delete_column: false
    cell_size: "normal"
    sticky_first_column: true
    show_search: true
    show_state: false
    wrap_content: false
    row_templates: "templates/row.md"

# Column Configuration
columns:
  - name: "title"
    key: "title" 
    input: "text"
    accessorKey: "title"
    label: "スタッフ名"
    position: 0
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 120
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: "none"
      persist_changes: true
      wrap_content: true
      content_color: ""
      content_alignment: "text-align-left"
      content_vertical_alignment: "text-align-top"
      option_source: "manual"
      content_color_props: ""
      content_font_weight: ""

  - name: "staffId"
    key: "staffId"
    input: "text"
    accessorKey: "staffId"
    label: "スタッフID"
    position: 1
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 100
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: "none"
      persist_changes: true
      wrap_content: true
      content_color: ""
      content_alignment: "text-align-left"
      content_vertical_alignment: "text-align-top"
      option_source: "manual"
      content_color_props: ""
      content_font_weight: ""

  - name: "date"
    key: "date"
    input: "calendar"
    accessorKey: "date"
    label: "日付"
    position: 2
    skipPersist: false
    isHidden: false
    sortIndex: 0
    width: 120
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: "none"
      persist_changes: true
      wrap_content: true
      content_color: ""
      content_alignment: "text-align-left"
      content_vertical_alignment: "text-align-top"
      option_source: "manual"
      content_color_props: ""
      content_font_weight: ""
      date_format: "yyyy-MM-dd"
      date_format_separator: "-"
      hour_format: "24h"
      locale: "ja"

  - name: "shift_code"
    key: "shift_code"
    input: "select"
    accessorKey: "shift_code"
    label: "シフト区分"
    position: 3
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 100
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: "none"
      persist_changes: true
      wrap_content: true
      content_color: ""
      content_alignment: "text-align-center"
      content_vertical_alignment: "text-align-middle"
      option_source: "manual"
      content_color_props: ""
      content_font_weight: "bold"
      options:
        - { label: "通常勤務", value: "A", color: "#4CAF50" }
        - { label: "午前休", value: "B", color: "#2196F3" }
        - { label: "午後休", value: "C", color: "#FF9800" }
        - { label: "完全休", value: "D", color: "#9E9E9E" }

  - name: "time"
    key: "time"
    input: "text"
    accessorKey: "time"
    label: "勤務時間"
    position: 4
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 120
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: "none"
      persist_changes: true
      wrap_content: true
      content_color: ""
      content_alignment: "text-align-center"
      content_vertical_alignment: "text-align-middle"
      option_source: "manual"
      content_color_props: ""
      content_font_weight: ""

# Filters Configuration
filters:
  - name: "今日のシフト"
    field: "date"
    operator: "="
    value: "{{today}}"
    enabled: true
  
  - name: "今週のシフト"
    field: "date"
    operator: "between"
    start_value: "{{week_start}}"
    end_value: "{{week_end}}"
    enabled: true
  
  - name: "今月のシフト"
    field: "date"
    operator: "between"
    start_value: "{{month_start}}"
    end_value: "{{month_end}}"
    enabled: true

  - name: "通常勤務のみ"
    field: "shift_code"
    operator: "="
    value: "A"
    enabled: true

  - name: "休み予定"
    field: "shift_code"
    operator: "in"
    value: ["B", "C", "D"]
    enabled: true

# Views Configuration
views:
  - name: "Table"
    type: "table"
    id: "table_view"
    enabled: true
    default: false
    config:
      columns_order: ["title", "staffId", "date", "shift_code", "time"]
      columns_width:
        title: 120
        staffId: 100
        date: 120
        shift_code: 100
        time: 120
      sort_by: "date"
      sort_order: "asc"
      pagination: 50
      sticky_header: true

  - name: "Calendar"
    type: "calendar"
    id: "calendar_view"
    enabled: true
    default: true
    config:
      date_field: "date"
      title_field: "title"
      color_field: "shift_code"
      time_field: "time"
      initial_view: "dayGridMonth"
      first_day_of_week: 1
      week_numbers: false
      business_hours:
        start: "09:00"
        end: "17:00"
        days: [1, 2, 3, 4, 5, 6]
      event_display:
        time_format: "HH:mm"
        all_day: false
        background_events: false
        display_event_time: true
        display_event_end: false
      color_mapping:
        A: "#4CAF50"
        B: "#2196F3"
        C: "#FF9800"
        D: "#9E9E9E"
      locale: "ja"
      header_toolbar:
        left: "prev,next today"
        center: "title"
        right: "dayGridMonth,dayGridWeek,listWeek"

# Templates Configuration
templates:
  new_file: |
    ---
    title: "{{prompt:スタッフ名}}"
    staffId: "{{prompt:スタッフID}}"
    date: "{{date:YYYY-MM-DD}}"
    shift_code: "{{suggest:A,B,C,D}}"
    time: "{{prompt:勤務時間|09:00-17:00}}"
    ---
    # シフトメモ（任意）
    {{prompt:メモ|}}

  file_name: "{{title}}_{{date}}"
  
  row_template: |
    ## {{title}} - {{date}}
    
    **シフト**: {{shift_code}} ({{time}})
    
    ### メモ
    {{content}}

# Actions Configuration
actions:
  - name: "今日のシフト作成"
    type: "create_file"
    template: "new_file"
    defaults:
      date: "{{today}}"
      shift_code: "A"
      time: "09:00-17:00"

  - name: "明日のシフト作成"
    type: "create_file"
    template: "new_file"
    defaults:
      date: "{{tomorrow}}"
      shift_code: "A"
      time: "09:00-17:00"

# Export Configuration
export:
  csv:
    enabled: true
    delimiter: ","
    include_headers: true
    date_format: "yyyy-MM-dd"
  
  json:
    enabled: true
    pretty_print: true
    include_metadata: false

# Advanced Settings
advanced:
  auto_save: true
  save_interval: 30000
  backup_enabled: true
  backup_interval: 300000
  max_backups: 10
  performance:
    lazy_loading: true
    virtual_scrolling: true
    cache_enabled: true
    debounce_delay: 300