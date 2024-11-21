import tkinter as tk
from tkinter import messagebox
import json

# ملف الـ JavaScript
file_path = "bcode.js"

# دالة لتحديث الملف
def update_file(title, html_code, css_code):
    try:
        # قراءة البيانات الموجودة في الملف
        with open(file_path, "r", encoding="utf-8") as file:
            data = file.read()

        # البحث عن الجزء الذي يحتوي على designs
        start_idx = data.find('[')
        end_idx = data.rfind(']') + 1
        json_data = data[start_idx:end_idx]

        # محاولة تحويل النص إلى قائمة JSON
        try:
            designs = json.loads(json_data)
        except json.JSONDecodeError:
            designs = []

        # إنشاء عنصر جديد
        new_design = {
            "id": len(designs) + 1,
            "title": title,
            "views": "8K",
            "htmlCode": html_code,
            "cssCode": css_code
        }

        # إضافة العنصر الجديد إلى القائمة
        designs.append(new_design)

        # تحويل القائمة إلى JSON مع تنسيق مناسب
        new_json_data = json.dumps(designs, indent=2)

        # تحديث محتوى الملف
        new_file_content = data[:start_idx] + new_json_data + data[end_idx:]
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(new_file_content)

        messagebox.showinfo("نجاح", "تم إضافة التصميم بنجاح!")
    except Exception as e:
        messagebox.showerror("خطأ", f"حدث خطأ: {e}")

# إنشاء واجهة المستخدم
root = tk.Tk()
root.title("تعديل ملف JavaScript")

# إعداد الحقول
tk.Label(root, text="Title:").pack(padx=10, pady=5)
title_entry = tk.Entry(root, width=40)
title_entry.pack(padx=10, pady=5)

tk.Label(root, text="HTML Code:").pack(padx=10, pady=5)
html_entry = tk.Text(root, height=10, width=40)
html_entry.pack(padx=10, pady=5)

tk.Label(root, text="CSS Code:").pack(padx=10, pady=5)
css_entry = tk.Text(root, height=10, width=40)
css_entry.pack(padx=10, pady=5)

# زر لإضافة التصميم
add_button = tk.Button(root, text="إضافة التصميم", command=lambda: update_file(title_entry.get(), html_entry.get("1.0", "end-1c"), css_entry.get("1.0", "end-1c")))
add_button.pack(padx=10, pady=20)

# تشغيل التطبيق
root.mainloop()