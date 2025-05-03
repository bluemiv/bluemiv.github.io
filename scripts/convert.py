# -*- coding: utf-8 -*-

import os
import shutil
from PIL import Image


def convert_png_to_webp(input_folder, output_folder, quality=100, target_width=1080):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    files = os.listdir(input_folder)
    for filename in files:
        if filename.lower().endswith(('.jpeg', '.png', ".jpg", ".webp")):
            png_path = os.path.join(input_folder, filename)
            webp_filename = f'{os.path.splitext(filename)[0]}.webp'
            webp_path = os.path.join(output_folder, webp_filename)

            with Image.open(png_path) as img:
                width_percent = target_width / float(img.width)
                target_height = int(float(img.height) * width_percent)

                img = img.resize((target_width, target_height), Image.LANCZOS)
                img.save(webp_path, 'webp', quality=quality)

                print(
                    f"✅ {filename} → {webp_filename} 변환 완료 (품질: {quality}%, 크기: {target_width}x{target_height})")


input_folder = os.path.abspath('./raw')
output_folder = os.path.abspath('./results')

convert_png_to_webp(input_folder, output_folder, quality=100)

if os.path.exists(input_folder):
    shutil.rmtree(input_folder)
if not os.path.exists(input_folder):
    os.makedirs(input_folder)
