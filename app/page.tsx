'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Award,
  Smile,
  FileText,
  Lightbulb,
  Play,
  Pause,
  Layers,
  Volume2,
  Copy,
  Check,
  MessageCircle,
  TrendingUp,
  Heart,
  ChevronRight,
  RefreshCw,
  Sliders,
  CheckCircle,
  HelpCircle,
  UserCheck
} from 'lucide-react';

// Preset niches for quick workshop sandbox learning
const PRESETS = [
  {
    id: 'cafe-plant',
    title: '🌿 คาเฟี่รักสุขภาพ 2026',
    audience: 'กลุ่มคนทำงานเมือง (Salaryman) ที่ไม่มีเวลาทานอาหารเซ้า แต่อยากดูแลตัวเอง',
    rawText: `เราเป็นเดลิเวอรี่คาเฟ่สุขภาพใจกลางกรุงเทพฯ เมนูใหม่คือ Organic Plant Protein Shake ใช้อะโวคาโดจากเชียงใหม่ นมข้าวโอ๊ตออร์แกนิก และผงโปรตีนอินทรีย์จากพืช 4 ชนิด ไม่ผสมน้ำตาล มีกรดอะมิโนครบถ้วน อิ่มนาน ช่วยเสริมสร้างกล้ามเนื้อและลดความเหนื่อยล้าจากการทำงาน`,
    keyword: 'Healthy Shake'
  },
  {
    id: 'otop-silk',
    title: '🏮 OTOP ผ้าไหมไทยมัดหมี่ระดับพรีเมียม',
    audience: 'ผู้ซื้อกลุ่มผู้บริหารและผู้รักงานศิลปหัตถกรรมประยุกต์ร่วมสมัย เน้นคุณค่าอัตลักษณ์ท้องถิ่น',
    rawText: `ผ้าไหมย้อมสีธรรมชาติจากแก่นไม้พื้นถิ่นของอำเภอหนึ่ง ทอลายดั้งเดิมผสมโครงสร้างเลขาคณิตโมเดิร์น ยกระดับสินค้าชุมชนไทยสู่สากล ทุกผืนใช้เวลาทอมือกว่า 3 เดือนโดยช่างฝีมือผู้สูงอายุที่มีความตั้งใจ อยากนำเสนอในมุมผ้าหมี่โบราณที่สวมใส่ออกงานสากลได้จริง`,
    keyword: 'Premium Thai Silk'
  },
  {
    id: 'sme-tea',
    title: '🍵 ชาสมุนไพรเกสรดอกไม้ป่า บำบัดสมาธิ',
    audience: 'กลุ่มวัยทำงานและผู้บริหารที่ต้องการผ่อนคลายความเครียด และแก้ปัญหานอนไม่หลับ',
    rawText: `ชาเกสรดอกไม้ประยุกต์ผสมคาโมมายล์และชาดอกบัวหลวงอินทรีย์ ปราศจากคาเฟอีน คัดสรรเฉพาะเกสรที่บานเต็มที่ในฤดูหนาวเพื่อน้ำมันหอมระเหยบำบัด ชงแล้วจะให้กลิ่นหอมบางๆ นุ่มลึก ช่วยดีท็อกซ์ระบบในร่างกายและปรับคลื่นสมองให้สงบพร้อมสำหรับการนอนหลับลึก`,
    keyword: 'Mindfulness Tea'
  }
];

// ครูเด่น Quotes matching the warm persona
const SUPPORT_QUOTES = [
  { text: "“ไม่เป็นไรนะ ค่อย ๆ เป็น ค่อย ๆ ไป เราทำเท่าที่ไหวในก้าวนี้ก็สมบูรณ์แล้วครับ”", sub: "ครูเด่น" },
  { text: "“ลองสังเกตดูนะ... ของดีมีอยู่แล้วในแบรนด์ของคุณ แค่ให้ AI ช่วยจัดระเบียบให้คมขึ้น”", sub: "ครูเด่น" },
  { text: "“เราไม่ได้แข่งกับใครเลยครับ ความคิดสร้างสรรค์ที่ดีที่สุดคือการนำสิ่งดี ๆ จากใจสื่อสารไปให้ถึงผู้ใช้”", sub: "ครูเด่น" },
  { text: "“แค่เริ่มกด ลองเปลี่ยนตัวอักษรนิดเดียว ก็นับว่าเราได้เติบโตแล้วนะคนเก่ง”", sub: "ครูเด่น" },
  { text: "“ไม่ต้องวาดรูปเก่ง ไม่ต้องเก่งกราฟิก เราใช้สมองสกัดความรู้ แล้วให้ Canva แปลรหัส เป็นเรื่องง่ายและสนุก”", sub: "ครูเด่น" }
];

// Interactive 8-Step Guide of using NotebookLM with remote images and warm tips from Coach Den
const GUIDE_STEPS = [
  {
    id: 1,
    title: "1. ขั้นตอนการเข้าใช้งาน NotebookLM",
    badge: "เริ่มต้นใช้งาน",
    sub: "เข้าสู่ดินแดนปัญญาประดิษฐ์วิเคราะห์ข้อมูลส่วนตัว",
    desc: "ก้าวแรกแสนเรียบง่ายเพื่อปลดปล่อยศักยภาพที่ไร้ขีดจำกัด! เพียงเข้าเว็บใช้งานผ่านบัญชี Google ของเราได้ฟรีทันที แอร์บอร์ดปัญญาของ NotebookLM จะจดจำและย่อยเนื้อหาตามสัญชาตญาณของคุณ",
    link: "https://notebooklm.google.com/?utm_source=app_launcher&utm_medium=referral&authuser=0",
    linkLabel: "เปิดเว็บไซต์ NotebookLM ↗",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779539248/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_192649_rqftlh.png",
    denAdvice: "“ไม่ต้องกังวลว่าเครื่องมือจะยากนะครับ แค่คลิกเปิดลิงก์ด้านบนล็อกอินด้วยความเบิกบานใจ หัวใจเราพร้อมเติบโตแล้วล่ะครับ”"
  },
  {
    id: 2,
    title: "2. สร้าง โน้ตบุ๊กใหม่ (New Notebook)",
    badge: "สร้างสมุดปัญญา",
    sub: "กำหนดขอบเขตโปรเจกต์งานวิเคราะห์ของคุณ",
    desc: "คลิกปุ่มบวกเพื่อเริ่มสร้างสมุดบันทึกเล่มใหม่ (New Notebook) สำหรับรวบรวมคลังข้อมูลปัญญาประดิษฐ์ของคุณ หรือคลิกศึกษาเล่มปัญญาประดิษฐ์ที่ครูเด่นแชร์สะพายหลังไว้ในลิงก์สวรรค์จำลองด้านล่างนี้ได้ตามสะดวกครับ",
    link: "https://notebooklm.google.com/notebook/f9404a03-6af7-4682-af33-76aebe89f1c4?addSource=true",
    linkLabel: "ศึกษารูปแบบสมุดจำลองของครูเด่น (Sample Notebook) ↗",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779542404/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_201709_frgzb3.png",
    denAdvice: "“สมุดเปล่าเปี่ยมไปด้วยความหวังและการงอกงามใหม่ ๆ เสมอ ค่อย ๆ กดสร้างไปด้วยกันนะ ครูอยู่เคียงข้างเสมอครับ”"
  },
  {
    id: 3,
    title: "3. เพิ่มแหล่งข้อมูล (คอลัมน์ซ้ายมือ)",
    badge: "ป้อนวัตถุดิบดิบ",
    sub: "อัปโหลด PDF, ลิงก์บทความ หรือเนื้อหาวิถีดั้งเดิมเข้าสู่ระบบ",
    desc: "หาช่อง 'เพิ่มแหล่งข้อมูล (Add Source)' แถบเมนูด้านซ้าย แล้วอัปโหลดไฟล์ PDF ลิงก์หรืองานวิจัย ข้อมูลแบรนด์ดิบส่งเข้าไปเถอะครับ ไม่พรีเมียมในตอนแรกก็ไม่เป็นไร ระบบจะอุ้มชูและจัดระเบียบให้อย่างสุภาพงาม",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779539152/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_191752_pdvhk4.png",
    denAdvice: "“แบรนด์ของคุณมีของวิเศษซ่อนอยู่แล้วในข้อมูลดิบเหล่านี้ครับ ค่อย ๆ นำมันใส่เข้าไปด้วยใจที่เชื่อมั่นนะ”"
  },
  {
    id: 4,
    title: "4. แชทสั่งงาน (คอลัมน์ห้องสนทนากลาง)",
    badge: "รีดพลังปัญญา",
    sub: "การพิมพ์คุยสนทนาซักถาม เช่น 'ช่วยสรุปสิ่งสำคัญเป็น 5 ข้อพรีเมียม'",
    desc: "พิมพ์ข้อร้องเรียนหรือประเด็นตรงช่องแชทตรงพื้นที่แกนกลาง เช่น 'ช่วยสรุปประเด็นพรีเมียม 5 ข้อ สะอาดตาให้ประทับใจวัยรุ่นและผู้สัญจร' คำอวยและข้อเขียนดีๆ จะกลั่นกรองเป็นระเบียบพ้นความคลุมเครือ",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779539152/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_191759_iubs2l.png",
    denAdvice: "“คำพูดจากใจย่อมสื่อสารถึงใจได้ดีที่สุด แชทพูดคุยกับ AI เหมือนเพื่อนสนิทคนหนึ่งที่คอยช่วยตกผลึกความคิดแทนเรานะครับ”"
  },
  {
    id: 5,
    title: "5. สร้างสรรค์งานด้วยสตูดิโอ (คอลัมน์ขวามือสุด)",
    badge: "วางต้นสเก็ตช์",
    sub: "สร้าง อินโฟกราฟิก ปักหมุดบทความ หรือสรุปโครงสไลด์สวยงาม",
    desc: "ที่ห้อง 'สรุปผลงานผลิต (Saved Notes / Studio Library)' ทางขวาสุด ทุกครั้งที่แชทสรุปแกนเสร็จ สามารถกดพินไว้เพื่อสลักแผ่ออกเป็นสับพอร์ตกราฟิก แผ่นพับ หรือสลักประโยคกระชับหลอมสายตาอย่างถูกต้องก่อนนำไปวางใน Canva",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779539448/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_193033_bcykdl.png",
    denAdvice: "“ตรงนี้คือนิทรรศการผลึกความคิดของเราครับ ชิ้นงานสะท้อนเนื้อดีที่ถูกจัดวางระบบไว้อย่างหรูหราอิ่มเอมเสมอครับ”"
  },
  {
    id: 6,
    title: "6. ปรับแก้และเกลาข้อความให้ละเอียด",
    badge: "เจียระไนลายเซ็น",
    sub: "อิสระเสรีในการแก้ไขแต่งเติมประเด็นในแต่ละสไลด์",
    desc: "เทคโนโลยีไม่ได้สมบูรณ์แบบเสมอไป และนั่นคือข้อดี! คุณสามารถดับเบิ้ลคลิกแก้ไขประโยคขัดเกลาสำนวนแบรนด์ เติมเสน่ห์ท้องถิ่น เพิ่มเสียงหัวใจจริงของคุณ เข้าไปปรากฏเป็นเจ้าของสไลด์แต่ละชิ้นได้อย่างเต็มที่",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779539506/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_193125_mxjovx.png",
    denAdvice: "“นี่คือลวดลายวิจิตราของคุณครับ จิตรกรตัวจริงปรับแก้งานเล็กน้อยด้วยรักและความอ่อนโยนที่มีคุณค่าล้นพ้นครับ”"
  },
  {
    id: 7,
    title: "7. กำหนดรูปแบบชิ้นงานเพิ่มเติม",
    badge: "ตกแต่งรายละเอียด",
    sub: "กำหนดรูปแบบชิ้นงาน หรือใส่คำสั่งพร้อมข้อแนะนำเสริมได้เสมอ",
    desc: "กำหนดสเป็กเพิ่มเติม แอดไอเดียความสุขใส่โครงร่างสุนทรียวิจิตร หรือส่งพร้อมบรีฟเพื่อระบุสีสัน อารมณ์ ฟอนต์ ปรับแต่งให้สไลด์และอินโฟมีระเบียบ มีน้ำหนักกระชับน่าวิเคราะห์มากขึ้น",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779539152/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_192021_co3yf0.png",
    denAdvice: "“ไม่ต้องแข่งกับใครเลยครับ ปรับสเป็คทีละวัน ตกแต่งข้อมูลทีละสเต็ป นี่แหละกุญแจสำคัญสู่ความสงบและรุ่งเรืองพรีเมียม”"
  },
  {
    id: 8,
    title: "8. สร้างสรังสรรค์งานซ้ำ & ก็อปปี้ป้อนไป Canva",
    badge: "คัดลอกประสานร่าง",
    sub: "ก๊อปวางหัวข้อพรีเมียมลงบนกล่องข้อความเทมเพลตใน Canva สำเร็จรูป",
    desc: "เสร็จสิ้นกระบวนการหล่อลื่นความเข้าใจชั้นสูงระดับสากล! คัดลอกพาดหัว (Headline) ข้อความสามระดับ และ Call to Action ไปปะติดวางลงบนชิ้นงานศิลปะใน Canva ได้ทันที โดยไม่มีปัญหาสระลอยหรือแน่นปูดสายตาอีกต่อไปครับ",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779539662/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_193410_l44vgf.png",
    denAdvice: "“เห็นไหมครับ ยอดเยี่ยมยอดนักเรียนรู้เลย! คุณสกัดดีไซน์ทองคำได้เรียบร้อย ยิงธนูสำเร็จ มีความสุขกับความงามแบรนด์นะลูกนะ!”"
  }
];

// Interactive 5-Step Guide of using System Prompt on ChatGPT
const CHATGPT_PROMPT_STEPS = [
  {
    id: 1,
    title: "1. เข้าหน้าเว็บไซต์ ChatGPT",
    badge: "เริ่มต้นใช้งาน",
    sub: "ก้าวแรกสู่การเริ่มต้นใช้ระบบช่วยแต่งสารให้พรีเมียม",
    desc: "เริ่มต้นความมั่นใจด้วยการเข้าหน้าเว็บไซต์ ChatGPT เพื่อเรียนรู้การประยุกต์ใช้ชุดคำสั่งที่ดึงสัญชาตญาณความเด่นของแบรนด์ออกมาใน 3 วินาทีแรกอย่างทรงพลัง",
    link: "https://chatgpt.com/",
    linkLabel: "เปิดเว็บไซต์ ChatGPT ↗",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779541400/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_200202_hzfqim.png",
    denAdvice: "“ลองก้าวเท้าเข้าไปทดลองสัมผัสสิ่งใหม่ๆ กันดูนะครับ ChatGPT เปิดใช้ได้ฟรีเลย ค่อยๆ ลองส่งข้อความไปด้วยกันนะลูกนะ”"
  },
  {
    id: 2,
    title: "2. วาง System Prompt และ เนื้อหาที่จะสรุป",
    badge: "ป้อนข้อกำหนดและสารตั้งต้น",
    sub: "ผสาน 2 ขุมพลังกระตุ้นปัญญา: ตารางกฎเกณฑ์เฉียบคม + ข้อมูลแบรนด์ดิบของคุณ",
    desc: "เปิดแชทใหม่ใน ChatGPT แล้วป้อนเตรียมข้อมูลลงไปเป็น 2 ส่วนสำคัญอย่างเป็นระเบียบ:\n\n• ส่วนที่ 1: วางชุดคำสั่ง System Prompt (คัดลอกได้ตามปุ่มด้านล่างนี้ได้เลยนะครับครูเตรียมไว้ให้แล้ว)\n• ส่วนที่ 2: วางเรื่องราว / ข้อมูลแบรนด์ดิบที่คุณต้องการย่อยให้กระชับสัดส่วน",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779541401/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_200226_w2bsxd.png",
    denAdvice: "“ขั้นตอนสำคัญคือการมอบตัวตนผู้เชี่ยวชาญให้น้อง AI ครับ ลองคลิกปุ่มคัดลอกข้อความวิเศษที่ครูเตรียมไว้ให้ แล้ววางลงไปพร้อมข้อมูลคุณนะคร้าบ”",
    showPromoPrompt: true,
    promoPromptText: "[Persona] คุณคือ Creative Director และ Infographic Designer มืออาชีพที่มีประสบการณ์สูง [ความเชี่ยวชาญ] คุณมีความเชี่ยวชาญในการเปลี่ยนเนื้อหาที่ซับซ้อน อ่านยาก หรือเป็นบทความยาวๆ ให้กลายเป็นข้อมูลที่สั้น กระชับ เข้าใจง่ายภายใน 3 วินาที เหมาะสำหรับการนำไปทำกราฟิกบน Canva [บทบาท หน้าที่ คำสั่ง] จากเอกสารข้อมูลใน Source เรื่อง [ใส่ชื่อเรื่อง/หัวข้อ] ช่วยสรุปเนื้อหาและประเด็นสำคัญ [รูปแบบที่ต้องการ] โดยขอผลลัพธ์ในรูปแบบ 'โครงสร้างอินโฟกราฟิกแบบ 3 ส่วน' แบ่งเป็น: ส่วนที่ 1: หัวข้อหลัก (Headline) ที่ทรงพลัง ดึงดูดสายตา ส่วนที่ 2: เนื้อหาสำคัญ 3 ประเด็น (3 Key Takeaways) สรุปเป็นข้อสั้นๆ (Bullet Points) ข้อละไม่เกิน 2 ประโยค เพื่อให้พิมพ์ลงในเลย์เอาต์กราฟิกแล้วตัวอักษรไม่แน่นเกินไป ส่วนที่ 3: คำกระตุ้น (Call to Action - CTA) หรือบทสรุปทิ้งท้ายสั้นๆ 1 ประโยค"
  },
  {
    id: 3,
    title: "3. กดส่งคำสั่งเพื่อกระตุ้นสรุปทันที",
    badge: "ส่งคำร้อง",
    sub: "เริ่มรันเวทมนตร์ย่อยสารให้ละมุนตาอย่างรวดเร็ว",
    desc: "คลิกส่งแชทออกไปได้เลย ChatGPT จะใช้หลักความเข้าใจในชุดข้อสั่งของเรา แปลข้อความยากๆ ยืดยาว ให้เป็นหัวข้อหลักพรีเมียม (Headline), ไฮไลต์ 3 ข้อ (Key Takeaways) และ Call to Action ท้ายแผ่นทันที!",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779541401/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_200226_w2bsxd.png",
    denAdvice: "“เห็นไหมครับ ความยุ่งยากปลดแอกแล้ว! ข้อมูลเรียงลงมาพรีเมียม สบายตาและสมบูรณ์แบบมากเลยครับ ลองสละเวลามองความงามสิลูกนะ”"
  },
  {
    id: 4,
    title: "4. ป้อนคำสั่งกระตุ้นดีไซน์ 'สร้างเป็น อินโฟกราฟฟิก'",
    badge: "คัดท้ายงานออกแบบ",
    sub: "คำสั่งกระตุ้นให้ไอเดียระเบียบภาพโดดเด่นยิ่งขึ้น",
    desc: "พิมพ์คำสั่งเพิ่มเติมสะกิดน้อง AI ไปว่า 'สร้างเป็น อินโฟกราฟฟิก' ดังภาพประกอบ ระบบจะเริ่มพรีเซิร์ฟเค้าโครง โทนสี อักษร และระยะแอดห่างที่ถูกต้องเพื่อให้ชิ้นส่วนกราฟิกสมบูรณ์แบบที่สุด",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779541402/%E0%B8%AA%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%99%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%95_2026-05-23_200241_zzdh77.png",
    denAdvice: "“การโต้ตอบด้วยความใจเย็น จะช่วยสอนและชี้แนะให้น้อง AI เข้าใจคุณลักษณะเฉพาะของแบรนด์เราได้เข้าฝั่งวิจิตราที่สุดครับ”"
  },
  {
    id: 5,
    title: "5. ชื่นชมและคัดลอกผลลัพธ์ไปลุยใน Canva",
    badge: "สัมฤทธิผลยอดเยี่ยม",
    sub: "ครอบครองสารที่แสนบริสุทธิ์เพื่อประสานในเทมเพลตสีสวย",
    desc: "คุณจะได้อินโฟกราฟิกสามส่วนด่วนที่ผ่านกระบวนการถอดผลึกเสร็จสิ้น! ทุกข้อมีความยาวพอเหมาะ พรมนิ้วคัดลอกพาดหัวและกระโดดก๊อปวางลงบนแผ่น Canva ของขวัญตามจังหวะสบายๆ โดยไม่มีปัญหาสระลอยหรือเลย์เอาต์แน่นอึดอัดอีกต่อไป",
    image: "https://res.cloudinary.com/dmo4kq7ej/image/upload/v1779541709/ChatGPT_Image_23_%E0%B8%9E.%E0%B8%84._2569_20_08_05_ybq5rd.png",
    denAdvice: "“ยินดีด้วยนะครับ! คุณจับหลักการสรุปสเต็ประดับเทพได้พรีเมียมแล้วล่ะครับ ต่อไปนี้งานออกแบบภาพแบรนด์จะเป็นเรื่องสะดวดสบายที่มีสุขยิ่งๆ ขึ้นไปลูกนะ”"
  }
];

export default function WorkshopPage() {
  const [activeTab, setActiveTab] = useState<'slides' | 'sandbox' | 'chat' | 'guide'>('slides');
  const [selectedGuideType, setSelectedGuideType] = useState<'notebooklm' | 'chatgpt_prompt'>('notebooklm');
  const [currentGuideStep, setCurrentGuideStep] = useState(0);
  const [isGuideImageModalOpen, setIsGuideImageModalOpen] = useState(false);
  
  const activeStepsList = selectedGuideType === 'notebooklm' ? GUIDE_STEPS : CHATGPT_PROMPT_STEPS;
  
  // Custom states for Workshop Sandbox
  const [selectedPreset, setSelectedPreset] = useState<string>('cafe-plant');
  const [businessType, setBusinessType] = useState(PRESETS[0].title);
  const [targetAudience, setTargetAudience] = useState(PRESETS[0].audience);
  const [rawContext, setRawContext] = useState(PRESETS[0].rawText);
  const [formatType, setFormatType] = useState<'3parts' | 'comparison'>('3parts');
  
  // Generation output state
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [generatedOutput, setGeneratedOutput] = useState<{
    headline: string;
    takeaways?: Array<{ title: string; detail: string }>;
    beforeItems?: string[];
    afterItems?: string[];
    cta: string;
  } | null>({
    headline: "🌿 ปฏิวัติพลังงานคนเมือง! สวิตช์มาพึ่ง 'โปรตีนพืช' ดียังไง?",
    takeaways: [
      { title: "ย่อยง่าย สบายท้อง", detail: "มีไฟเบอร์สูง ช่วยให้ระบบขับถ่ายทำงานดีขึ้น ไม่รู้สึกอึดอัดอิ่มตึงระหว่างสัปดาห์ทำงาน" },
      { title: "ลีนไขมัน เสริมพลัง", detail: "ให้สารอาหารโปรตีนสะอาดจากธรรมชาติระดับพรีเมียม มั่นใจไร้สารปนเปื้อน เสริมระบบกล้ามเนื้อฟื้นฟูไว" },
      { title: "รักษ์โลก รักตัวเอง", detail: "ใช้วัตถุดิบท้องถิ่น สนับสนุนเกษตรกรไทยทางเหนือ ลดคาร์บอนฟุตพริ้นท์เพื่อสิ่งแวดล้อมป่าไม้ยั่งยืน" }
    ],
    cta: "🛒 ลองเลยวันนี้! เมนูพืช 100% ระดับ Premium ที่คาเฟ่รักสุขภาพของเรา"
  });

  // Copied indicator state
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Slides State
  const [currentSlide, setCurrentSlide] = useState(0);

  // ครูเด่น Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatLogs, setChatLogs] = useState<Array<{ sender: 'user' | 'den'; text: string }>>([
    {
      sender: 'den',
      text: 'สวัสดีครับผมยินดีต้อนรับนะ ครูเด่นอยู่นี่เพื่อช่วยเหลือเราครับ... วันนี้กำลังเหนื่อยล้า หรือติดหัวข้อตรงไหนเกี่ยวกับการออกแบบ วางแผนข้อมูลเพื่อไปทำสไลด์ใน Canva บ้างไหมครับ? แวะมาพูดคุย ปลดปล่อยความกังวลกันก่อนได้เลย ค่อยๆ เป็น ค่อยๆ ไปด้วยกันนะ'
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Supportive Quote State
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Podcast Simulation State
  const [podcastPlaying, setPodcastPlaying] = useState(false);
  const [podcastProgress, setPodcastProgress] = useState(0);
  const [podcastSpeed, setPodcastSpeed] = useState<'en' | 'th'>('th'); // language mode for brief
  const podcastInterval = useRef<NodeJS.Timeout | null>(null);

  // Sync state if preset is changed
  const handlePresetSelect = (id: string) => {
    const preset = PRESETS.find(p => p.id === id);
    if (preset) {
      setSelectedPreset(id);
      setBusinessType(preset.title);
      setTargetAudience(preset.audience);
      setRawContext(preset.rawText);
    }
  };

  // Switch Supportive Quotes
  const rotateQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % SUPPORT_QUOTES.length);
  };

  // Trigger copy function
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  // Slide definitions for "The Digital Alchemist: Transforming Data into Design Masterpieces"
  const slidesContent = [
    {
      title: "The Digital Alchemist",
      subtitle: "Transforming Data into Design Masterpieces",
      tagline: "การทรานส์ฟอร์มข้อมูลระดับพรีเมียม สื่อสารอัตลักษณ์ท้องถิ่นและองค์กรด้วยพลังไฮบริด",
      cover: true,
      visual: "https://picsum.photos/seed/vintage/800/600",
      content: [
        "หลักสูตรพัฒนาโดย ครูเด่น มาสเตอร์ฟา",
        "มิติใหม่ของการย่อยข้อมูลทำสไลด์: ผลึกจิตวิทยาความคิดประยุกต์ พลังแห่งความเป็นไปได้ร่วมของมนุษย์และ AI อัจฉริยะ",
        "เป้าหมาย: ดึงเอกลักษณ์ เสน่ห์ที่ซ่อนอยู่ในแบรนด์ท้องถิ่น พัฒนาสู่หน้าตา สไลด์ และอินโฟกราฟิกที่หรูหรา น่าเชื่อถือ"
      ]
    },
    {
      title: "The Workflow Revolution",
      subtitle: "เปลี่ยนจากเสียเวลานั่งนึกนานหลายชั่วโมง ให้เป็นงานเสร็จระดับ 10x",
      tagline: "เมื่อ NotebookLM ช่วยปูรากฐาน แล้ว Canva ดูแลความงามของรูปภาพ",
      cover: false,
      steps: [
        { title: "1. โยนวัตถุดิบดิบ", desc: "ใส่ข้อมูล PDF, ลิงก์, เอกสารแบรนด์ หรือโน้ตเสียงที่รวบรวมไว้ ลงใน Notebookส่วนตัวใน NotebookLM" },
        { title: "2. วางแผนคอนเซปต์ AI", desc: "คุยกับ AI เพื่อจำแนกกลุ่มเป้าหมาย ออกแบบพิกเซลรหัสสี สรุปจุดขายหลัก และสร้างโครงสร้างแบบ Flows" },
        { title: "3. จัดวางง่ายดายด้วย Canva", desc: "เมื่อโครงสร้าง หัวข้อพาดหัว และองค์ประกอบชัดเจนแล้ว นำไปวางใน Canva ได้ทันที งานออกมาทรงพลังและถูกต้องรวดเร็ว" }
      ]
    },
    {
      title: "The Secret Sauce: PETF Formula",
      subtitle: "สูตรกรอบโครงสร้างอินโฟกราฟิกสำเร็จรูป สั่งงาน AI ได้คมกริบ",
      tagline: "4 ส่วนประกอบหลักเพื่อการสกัดหัวใจแห่งคอนเทนต์ให้อิมแพคภายใน 3 วินาที",
      cover: false,
      petf: [
        { label: "P - Persona (บทบาท)", text: "คุณคือ Creative Director และ Infographic Designer ผู้เชี่ยวชาญ คัดร้อยคำสวยกระชับอย่างมืออาชีพ" },
        { label: "E - Expertise (ทักษะ)", text: "มีความเชี่ยวชาญสูงสุดในการย่อยบทความ ซับซ้อน ให้ออกมาเด่นชัด มีจังหวะวรรคตอนที่ทรงเสน่ห์ประทับใจ" },
        { label: "T - Task (หน้าที่)", text: "วิเคราะห์ข้อมูลจากเอกสารหน้างาน สรุปสิ่งสำคัญที่สุดเป็นประเด็นดึงดูดใจ และตัดคำส่วนเกินที่ไม่จำเป็นออกทั้งหมด" },
        { label: "F - Format (ผลลัพธ์)", text: "สัญญากับเราว่าผลลัพธ์ต้องได้ หัวข้อพาดหัวที่ดึงดูด (Headline) + เนื้อหาหลัก 3 ข้อมูล ที่แผ่ออกมาสวยงาม + และแบรนด์ CTA" }
      ]
    },
    {
      title: "Canva Traditional vs. NotebookLM Enhanced",
      subtitle: "ตารางเปรียบเทียบการพลิกโฉมศักยภาพงานออกแบบและสุนทรียภาพ",
      tagline: "ความแตกต่างระหว่างความคลุมเครือจากการสุ่มสร้าง กับตรรกะที่แข็งแกร่ง",
      cover: false,
      comparison: true
    },
    {
      title: "Strategic Action Plan",
      subtitle: "ก้าวแรกจากศูนย์เพื่อความภูมิใจในผลงานของคุณ",
      tagline: "คุณทำได้แน่นอน ครูอยู่ข้างหลังคอยสนับสนุนในทุกย่างก้าวของการเรียนรู้",
      cover: false,
      actionSteps: [
        { num: "01", title: "เตรียม Sources ให้ลึก", desc: "อัปโหลดข้อมูลของดี ประวัติความเป็นมา ประโยชน์ที่น่าเหลือเชื่อ หรือบทสัมภาษณ์แบรนด์เข้าสู่คลังปัญญา" },
        { num: "02", title: "สลักข้อความด้วยเวทมนตร์", desc: "ฝึกฝนใช้ Prompt Formula รวบรวม Headline สกัดเป็น 3 สำคัญ ประโยคกระชับตรงจุด" },
        { num: "03", title: "สรรค์สร้างลงบนผืนผ้าใบ", desc: "เลือก Mood design, โทนสีและ Hex Codes นำไปวางใน Template Canva อย่างเป็นระเบียบพร้อมส่งมอบ" }
      ]
    }
  ];

  // Slideshow Navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesContent.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesContent.length) % slidesContent.length);
  };

  // Generate content using next server endpoint
  const generateInfographic = async () => {
    setIsGenerating(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          businessType,
          targetAudience,
          rawContext,
          formatType
        })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setGeneratedOutput(resData.data);
        // Play a warm notification sound or effect here if needed
      } else {
        setErrorMsg(resData.error || 'เกิดความผิดพลาดในการส่งตรวจวิเคราะห์ข้อมูล ลองกดอีกครั้งนะครับ');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('เครือข่ายเชื่อมต่อขัดข้องชั่วคราว ไม่เป็นไรนะครับ ลองกดอีกสักรอบนะ');
    } finally {
      setIsGenerating(false);
    }
  };

  // Chat with ครูเด่น
  const sendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatLogs(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mode: 'advice',
          rawContext: userText
        })
      });

      const resData = await response.json();
      if (resData.success && resData.text) {
        setChatLogs(prev => [...prev, { sender: 'den', text: resData.text }]);
      } else {
        setChatLogs(prev => [...prev, {
          sender: 'den',
          text: 'ไม่เป็นไรนะคนเก่ง พอดีคลื่นสัญญาณของครูแกว่งไปนิดนึง แต่ครูอยากให้เธอยิ้มไว้ ค่อยๆ พิมพ์ลองถามอีกรอบดูลูก'
        }]);
      }
    } catch (error) {
      setChatLogs(prev => [...prev, {
        sender: 'den',
        text: 'ไม่เป็นไรเลย ใจเย็นๆ นะครับ สัญญาณอาจขัดข้องเล็กน้อย แต่เชื่อเถอะว่าความตั้งใจของเรามันมีค่ามากแล้วครับ ลองกดส่งข้อความหาครูเด่นใหม่อีกสักครั้งนะ'
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Podcast / DJ Brief Audio overview simulation
  useEffect(() => {
    if (podcastPlaying) {
      podcastInterval.current = setInterval(() => {
        setPodcastProgress((prev) => {
          if (prev >= 100) {
            setPodcastPlaying(false);
            if (podcastInterval.current) clearInterval(podcastInterval.current);
            return 0;
          }
          return prev + 1.2;
        });
      }, 200);
    } else {
      if (podcastInterval.current) clearInterval(podcastInterval.current);
    }

    return () => {
      if (podcastInterval.current) clearInterval(podcastInterval.current);
    };
  }, [podcastPlaying]);

  const handlePodcastToggle = () => {
    if (podcastPlaying) {
      setPodcastPlaying(false);
    } else {
      setPodcastProgress(prev => prev === 100 ? 0 : prev);
      setPodcastPlaying(true);
    }
  };

  // Simulated transcription array depending on progress and language
  const getSimulatedTranscript = () => {
    const percent = podcastProgress;
    if (podcastSpeed === 'th') {
      if (percent < 20) return "🎙️ [เสียงดนตรีไทยบรรเลงประยุกต์] ดีเจชาย: \"สวัสดีครับคุณผู้ฟัง ยินดีต้อนรับสู่โปรเจ็กต์สรุปข้อมูลของดีชุมชนไทย...\"";
      if (percent < 40) return "🎙️ ดีเจหญิง: \"ใช่ค่ะ! วันนี้แบรนด์ของเราชูแนวความคิด 'The Digital Alchemist' ที่ตั้งใจสกัดเนื้อหาเพื่อเป้าหมาย...\"";
      if (percent < 60) return "🎙️ ดีเจชาย: \"เราเห็นการจัดหน้าของสิ่งจำลองนี้ มีการจับคู่สีแบบ Sage Green และโทนสีธรรมชาติ เพื่อให้คนมองแล้วรู้สึกอบอุ่น...\"";
      if (percent < 80) return "🎙️ ดีเจหญิง: \"จริงด้วย โครงสร้าง 3 ส่วนทำให้นึกถึง Canva ทันที อ่านจบ สื่อสารตรงประเด็น ภายใน 3 วินาทีเลยค่ะ...\"";
      return "🎙️ ดีเจชาย-หญิง: \"ไปลุยขั้นตอนเขียนประโยคและจัดทำความงดงามไปด้วยกันนะครับ! สู้ๆ นะคุณผู้ฟัง!\"";
    } else {
      if (percent < 20) return "🎙️ [Upbeats Lofi Beat] Voice A: 'Welcome to our project brief! Today, we are deep diving into the design thinking...'";
      if (percent < 40) return "🎙️ Voice B: 'Exactly, using NotebookLM ensures our copy matches target insights. Avocado green represents pure luxury...'";
      if (percent < 60) return "🎙️ Voice A: 'This structure aligns perfectly with our premium government and OTOP guidelines. Check the Hex codes...'";
      if (percent < 80) return "🎙️ Voice B: 'No fluff text. Only highly intensive copywriting that helps our designer build cards 5x faster...'";
      return "🎙️ Voice A: 'That is the hybrid intelligence where machine structures information and human crafts soul!'";
    }
  };

  // Initial load quote rotation automatically
  useEffect(() => {
    const interval = setInterval(rotateQuote, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-[#F5F5F0] bg-[#0F1A2C] flex flex-col font-sarabun selection:bg-[#C5A059]/20 selection:text-[#1A2B48] relative overflow-x-hidden">
      
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.22] z-0"
           style={{
             backgroundImage: 'radial-gradient(circle, #C5A059 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }} 
      />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#1A2B48]/45 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-[25%] left-[5%] w-[400px] h-[400px] bg-[#1A2B48]/20 rounded-full filter blur-[100px] pointer-events-none" />

      {/* --- Top Global Header --- */}
      <header className="relative z-20 border-b border-[#C5A059]/20 bg-[#0F1A2C]/90 backdrop-blur-md px-4 py-3.5 sticky top-0 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A2B48] flex items-center justify-center text-[#C5A059] shadow-md border border-[#C5A059]/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-prompt text-white tracking-tight flex items-center gap-1.5">
                NotebookLM <span className="text-[#C5A059] text-xs px-2 py-0.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 font-sans uppercase">Workshop</span>
              </h1>
              <p className="text-xs text-[#C5A059]/80 font-mono tracking-wider">The Hybrid Intelligence for Premium Design Thinking</p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex max-w-full overflow-x-auto scrollbar-none bg-[#13223A] p-1 rounded-xl border border-[#C5A059]/20 shadow-md shrink-0">
            <button
              onClick={() => setActiveTab('slides')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'slides'
                  ? 'bg-[#C5A059] text-[#0F1A2C] shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-[#C5A059]'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              หน้าสไลด์ (Slides)
            </button>
            <button
              onClick={() => {
                setActiveTab('sandbox');
                // Auto trigger if first time empty
                if (!generatedOutput && !isGenerating) generateInfographic();
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'sandbox'
                  ? 'bg-[#C5A059] text-[#0F1A2C] shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-[#C5A059]'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              เครื่องมือจำลอง (Sandbox)
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'guide'
                  ? 'bg-[#C5A059] text-[#0F1A2C] shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-[#C5A059]'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              ขั้นตอนจริง (Guide)
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'chat'
                  ? 'bg-[#C5A059] text-[#0F1A2C] shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-[#C5A059]'
              }`}
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              คุยกับครูเด่น (Advice)
            </button>
          </div>

          {/* Instructor Badge */}
          <div className="hidden lg:flex items-center gap-3 bg-[#13223A] pl-2 pr-4 py-1.5 rounded-full border border-[#C5A059]/30 shadow-md">
            <div className="w-8 h-8 rounded-full bg-[#1A2B48] flex items-center justify-center text-white border border-[#C5A059]">
              <span className="text-xs font-bold text-[#C5A059]">ด</span>
            </div>
            <div className="text-left">
              <span className="text-xs text-slate-400 block leading-none">ผู้นำกระบวนการ</span>
              <span className="text-xs font-semibold text-white leading-tight">ครูเด่น มาสเตอร์ฟา</span>
            </div>
          </div>
          
        </div>
      </header>

      {/* --- Main Wrapper --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 relative z-10 flex flex-col gap-6">
        
        {/* --- Top Welcome / Warm Quote Banner --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Facilitator Warm Banner */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#16253F] via-[#111D30] to-[#0A1320] rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between border border-[#C5A059]/30">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full filter blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#C5A059]/5 rounded-full filter blur-xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#C5A059]/20 text-[#E5C07B] text-xs px-2.5 py-1 rounded-full border border-[#C5A059]/40 inline-flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current text-[#C5A059]" /> Facilitator สายอบอุ่น
                </span>
                <span className="text-xs text-slate-300">| capvisionpartner.com</span>
              </div>
              
              <h2 className="text-2xl font-bold font-prompt text-white mb-2 leading-snug">
                “ยินดีต้อนรับสู่โลกศักยภาพแห่งความสร้างสรรค์ครับ”
              </h2>
              <p className="text-sm text-slate-200 font-sarabun max-w-2xl leading-relaxed mb-4">
                 NotebookLM ไม่ได้มาแย่งงานศิลปินปะติดภาพกราฟิกจากเรา แต่คือพลังสมองอัจฉริยะที่ช่วยถอดรหัสความคิด 
                วิเคราะห์จิตวิทยาผู้บริโภค นำทางไอเดียสี และย่อยสคริปต์สไลด์ให้กระชับ เพื่อให้คุณเป็นจิตรกรที่ถือแบบร่างสีทองคำเดินเข้าไปเลือกเลย์เอาต์สวยระดับเอเจนซี่ใน Canva ได้เรียบร้อยภายในเวลาเสี้ยวนาที!
              </p>
            </div>

            {/* Dynamic supportive thoughts (Rotated with smooth presentation) */}
            <div className="pt-4 border-t border-[#C5A059]/20 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 bg-[#0B1422]/70 -mx-6 -mb-6 p-6 rounded-b-3xl">
              <div className="flex-1">
                <span className="text-[10px] text-[#E5C07B] uppercase tracking-wider font-semibold font-prompt">ข้อความสร้างพลังใจจากครูเด่น</span>
                <p className="text-xs italic text-slate-200 pr-4 mt-0.5">
                  {SUPPORT_QUOTES[currentQuoteIndex].text}
                </p>
              </div>
              <button 
                onClick={rotateQuote}
                className="text-xs text-[#E5C07B] hover:text-white px-3 py-1.5 rounded-lg border border-[#C5A059]/30 hover:bg-[#C5A059]/20 transition-all flex items-center gap-1 whitespace-nowrap"
              >
                <RefreshCw className="w-3 h-3" /> รับกำลังใจถัดไป
              </button>
            </div>
          </div>

          {/* Quick Podcast Simulation Briefing Box */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#13223A] to-[#0F1A2C] rounded-3xl p-5 border border-[#C5A059]/20 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#C5A059] flex items-center gap-1.5 font-prompt">
                  <Volume2 className="w-4 h-4 text-[#C5A059]" /> Audio Overview โครงการ
                </span>
                <span className="text-[10px] bg-[#1C3254] px-2 py-0.5 rounded text-[#C5A059] border border-[#C5A059]/10 font-mono">
                  Podcast Simulator
                </span>
              </div>
              
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                เปลี่ยนวัตถุดิบตัวหนังสือเป็นไฟล์เสียงของดีเจ 2 ท่าน นั่งวิเคราะห์และสรุปหัวข้อประเด็น เพื่อใช้บรีฟทีมออกแบบร่วมกันทันที
              </p>

              {/* Player UI */}
              <div className="bg-[#0B1422] rounded-xl p-3 border border-[#C5A059]/20 mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePodcastToggle}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                      podcastPlaying 
                        ? 'bg-[#C5A059] text-[#1A2B48] shadow-md scale-105' 
                        : 'bg-[#1A2B48] text-white hover:bg-[#2C4163] border border-[#C5A059]/30'
                    }`}
                  >
                    {podcastPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 translate-x-0.5 fill-current" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-[#F5F5F0] truncate block">
                        {podcastSpeed === 'th' ? "🎙️ รีวิวแบรนด์ดั้งเดิม & สุขภาพพรีเมียม (ภาษาไทย)" : "🎙️ Design Brief Overview (English Podcast)"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{Math.floor(podcastProgress)}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-[#1C3254] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#C5A059] h-full transition-all duration-300" 
                        style={{ width: `${podcastProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Animated Wave visualizer when playing */}
                {podcastPlaying && (
                  <div className="flex items-center justify-center gap-1 mt-3 h-5">
                    {[1, 2, 3, 4, 5, 4, 3, 2, 4, 5, 6, 4, 2, 3, 5, 4].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-[#C5A059] rounded-full"
                        animate={{ height: [4 * h, 24, 4 * h] }}
                        transition={{
                          duration: 0.6 + (i * 0.05) % 0.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Language Switch */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] text-slate-300">เลือกโหมดดีเจ:</span>
                <button
                  onClick={() => { setPodcastSpeed('th'); setPodcastProgress(0); }}
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                    podcastSpeed === 'th' ? 'bg-[#C5A059]/20 text-[#C5A059] font-bold border-[#C5A059]/40' : 'text-slate-300 border-[#C5A059]/10 hover:border-[#C5A059]/30'
                  }`}
                >
                  เสียงครูเด่น & ทีมไทย
                </button>
                <button
                  onClick={() => { setPodcastSpeed('en'); setPodcastProgress(0); }}
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                    podcastSpeed === 'en' ? 'bg-[#C5A059]/20 text-[#C5A059] font-bold border-[#C5A059]/40' : 'text-slate-300 border-[#C5A059]/10 hover:border-[#C5A059]/30'
                  }`}
                >
                  English Dynamic
                </button>
              </div>
            </div>

            {/* Transcript scrollbox */}
            <div className="bg-[#0B1422] rounded-xl p-3 border border-[#C5A059]/20 min-h-[60px]">
              <span className="text-[9px] font-bold text-[#C5A566] block mb-1 uppercase tracking-wider">บทบรรยายสด (Live Highlight):</span>
              <p className="text-xs text-slate-200 italic leading-snug">
                {getSimulatedTranscript()}
              </p>
            </div>
          </div>

        </div>

        {/* --- Content Tabs rendering --- */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: PRESENTATION SLIDEDECK BOARD */}
            {activeTab === 'slides' && (
              <motion.div
                key="slides"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Slidedeck Frame Container */}
                <div className="bg-[#13223A] rounded-3xl overflow-hidden border border-[#C5A059]/30 shadow-2xl relative min-h-[460px] flex flex-col justify-between">
                  
                  {/* Decorative background stripes representing Modern Thai art direction */}
                  <div className="absolute top-0 right-0 w-[450px] h-[450px] opacity-[0.04] pointer-events-none stroke-current text-[#C5A059] overflow-hidden">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform scale-150 rotate-45">
                      <line x1="10" y1="0" x2="10" y2="100" strokeWidth="1" stroke="currentColor" />
                      <line x1="20" y1="0" x2="20" y2="100" strokeWidth="1" stroke="currentColor" strokeDasharray="3" />
                      <line x1="30" y1="0" x2="30" y2="100" strokeWidth="2" stroke="currentColor" />
                      <line x1="40" y1="0" x2="40" y2="100" strokeWidth="0.5" stroke="currentColor" />
                      <line x1="50" y1="0" x2="50" y2="100" strokeWidth="1" stroke="currentColor" />
                      <line x1="60" y1="0" x2="60" y2="100" strokeWidth="3" stroke="currentColor" />
                    </svg>
                  </div>

                  {/* Slide Main Body */}
                  <div className="p-8 sm:p-12 flex-1 flex flex-col justify-center relative">
                    
                    {/* Top Slide Meta */}
                    <div className="flex items-center justify-between border-b border-[#C5A059]/10 pb-4 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
                        <span className="text-[11px] font-mono tracking-widest text-[#C5A059] uppercase">
                          The Hybrid Intelligence Blueprint
                        </span>
                      </div>
                      <span className="text-xs bg-[#1C3254] text-[#C5A059] border border-[#C5A059]/20 font-semibold px-2.5 py-1 rounded-full">
                        หน้า {currentSlide + 1} / {slidesContent.length}
                      </span>
                    </div>

                    {/* Rendering dynamic layouts depending on slide indexes */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                      >
                        
                        {/* LEFT OR UNIQUE COMPONENT FOR COVERS */}
                        <div className={`md:col-span-7 space-y-4 ${slidesContent[currentSlide].cover ? 'md:border-r border-[#C5A059]/10 md:pr-8' : ''}`}>
                           <span className="text-xs font-bold font-prompt text-[#C5A059] tracking-wider uppercase bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#C5A059]/20 inline-block">
                            {slidesContent[currentSlide].tagline}
                          </span>
                          
                          <h3 className="text-3xl md:text-4xl font-extrabold font-prompt text-white leading-tight filter drop-shadow-md">
                            {slidesContent[currentSlide].title}
                          </h3>
                          <p className="text-lg text-slate-300 font-medium leading-normal italic">
                            {slidesContent[currentSlide].subtitle}
                          </p>

                          {/* Default Content List */}
                          {slidesContent[currentSlide].content && (
                            <ul className="space-y-3 pt-4">
                              {slidesContent[currentSlide].content.map((li, k) => (
                                <li key={k} className="flex items-start gap-2.5 text-sm md:text-base text-slate-200 font-sarabun leading-relaxed">
                                  <div className="w-5 h-5 rounded-md bg-[#1C3254] text-[#C5A059] border border-[#C5A059]/20 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</div>
                                  <span className="flex-1">{li}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Workflow Steps layout */}
                          {slidesContent[currentSlide].steps && (
                            <div className="grid grid-cols-1 gap-4 pt-4">
                              {slidesContent[currentSlide].steps.map((st, k) => (
                                <div key={k} className="bg-[#0B1422] p-4 rounded-2xl border border-[#C5A059]/15 flex gap-4 items-start hover:border-[#C5A059] transition-all">
                                  <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#0F1A2C] flex items-center justify-center font-bold font-prompt shrink-0 text-sm">
                                    {k + 1}
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-white font-prompt">{st.title}</h4>
                                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{st.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* PETF Formula layout */}
                          {slidesContent[currentSlide].petf && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                              {slidesContent[currentSlide].petf.map((pt, k) => (
                                <div key={k} className="bg-[#0B1422] p-4 rounded-2xl border border-[#C5A059]/15 hover:border-[#C5A059] transition-all">
                                  <span className="text-xs font-bold font-mono text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/20 block w-fit mb-2">
                                    {pt.label}
                                  </span>
                                  <p className="text-xs font-sarabun text-slate-200 leading-relaxed font-medium">
                                    {pt.text}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Traditional vs. AI Comparison matrix layout */}
                          {slidesContent[currentSlide].comparison && (
                            <div className="overflow-x-auto pt-4">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="border-b border-[#C5A059]/35 bg-[#0B1422] text-[#C5A059]">
                                    <th className="p-3 font-semibold font-prompt">ขั้นตอนทำงาน</th>
                                    <th className="p-3 font-semibold font-prompt bg-[#2D1A1E] text-red-400 border-r border-[#C5A059]/10">ทำใน Canva แบบเดิม</th>
                                    <th className="p-3 font-semibold font-prompt bg-[#122A1E] text-[#C5A059]">NotebookLM + Canva</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#C5A059]/10">
                                  <tr>
                                    <td className="p-3 font-semibold text-white">คิดประเด็น & สี</td>
                                    <td className="p-3 text-slate-300 bg-[#251518]/60 border-r border-[#C5A059]/10">สุ่มสี ไถเทมเพลตเรื่อยเปื่อย ไม่มีเป้าหมายลึก</td>
                                    <td className="p-3 text-slate-200 bg-[#0E2017]/60">สกัดจิตวิทยาและสรุปกลุ่มเป้าหมายทันทีใน 1 นาที</td>
                                  </tr>
                                  <tr>
                                    <td className="p-3 font-semibold text-white">คำโปรยเนื้อหา</td>
                                    <td className="p-3 text-slate-300 bg-[#251518]/60 font-mono border-r border-[#C5A059]/10">คิดประดิษฐ์ขึ้นเองหนาตาบนสไลด์ อักษรล้นเลย์เอาต์</td>
                                    <td className="p-3 text-slate-200 bg-[#0E2017]/60">สกัดหัวข้อ+เนื้อหา 3 ส่วน ประโยคกระชับ ตัวอักษรสวยพอดี</td>
                                  </tr>
                                  <tr>
                                    <td className="p-3 font-semibold text-white">การจัด Flow พรีเซนต์</td>
                                    <td className="p-3 text-slate-300 bg-[#251518]/60 border-r border-[#C5A059]/10">หยิบสไลด์กระจัดกระจายมารวมกัน ไม่เป็นขั้นเป็นตอน</td>
                                    <td className="p-3 text-slate-100 bg-[#0E2017]/60 font-semibold">วางสลาฟโครงสร้าง 1-10 ให้จบก่อน ค่อยวาดเส้นตกแต่ง</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* Strategic Action steps layout */}
                          {slidesContent[currentSlide].actionSteps && (
                            <div className="grid grid-cols-1 gap-4 pt-4">
                              {slidesContent[currentSlide].actionSteps.map((ac, k) => (
                                <div key={k} className="flex gap-4 items-center">
                                  <div className="w-12 h-12 bg-gradient-to-br from-[#C5A059] to-[#9E8043] text-[#0F1A2C] rounded-2xl flex items-center justify-center font-bold font-prompt text-lg shadow-sm">
                                    {ac.num}
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-white font-prompt">{ac.title}</h4>
                                    <p className="text-xs text-slate-300 leading-snug">{ac.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>

                        {/* RIGHT COLUMN - VISUAL OR ACCENT ILLUSTRATION */}
                        <div className="md:col-span-5 flex items-center justify-center">
                          {slidesContent[currentSlide].cover ? (
                            <div className="text-center md:text-left space-y-4">
                              <div className="w-24 h-24 rounded-full bg-[#0B1422] border-2 border-dashed border-[#C5A059] flex items-center justify-center mx-auto md:mx-0">
                                <Award className="w-10 h-10 text-[#C5A059]" />
                              </div>
                              <p className="text-xs text-slate-300 font-mono italic max-w-xs leading-relaxed">
                                &ldquo;The digital alchemist blends technology and local wisdom heritage effortlessly.&rdquo;
                              </p>
                              {/* Modern Thai Decorative Badge mockup */}
                              <div className="bg-[#0B1422] border border-[#C5A059]/40 p-4 rounded-2xl shadow-md text-left">
                                <span className="text-[10px] text-[#C5A059] block uppercase tracking-wider font-semibold font-prompt leading-none mb-1">DESIGN WORKSHOP BY</span>
                                <span className="text-sm font-bold text-white block">DEN_MASTERFA</span>
                                <span className="text-xs text-slate-400 block">Capvision Partner Group Co., Ltd.</span>
                              </div>
                            </div>
                          ) : (
                            <div className="relative w-full max-w-xs aspect-square bg-[#060D17] rounded-[2rem] overflow-hidden border border-[#C5A059] shadow-lg flex flex-col justify-between p-6">
                              {/* Background vector accents representing high-end feel */}
                              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059] opacity-10 rounded-full filter blur-xl" />
                              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full" />
                              
                              <div className="z-10 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                                <span className="text-[10px] text-[#C5A059] font-mono block">LAYOUT STRUCTURE PREVIEW</span>
                                <span className="text-xs font-semibold text-white">Canva 2026 Compatible</span>
                              </div>

                              {/* Simple visual outline representing a slide card */}
                              <div className="space-y-2 relative z-10 py-4">
                                <div className="h-4 bg-white/10 rounded w-1/2" />
                                <div className="h-2 bg-[#C5A059]/20 rounded w-3/4" />
                                <div className="h-2 bg-white/5 rounded w-full" />
                                <div className="h-2 bg-white/5 rounded w-5/6" />
                              </div>

                              <div className="z-10 bg-[#C5A059]/20 text-[#C5A059] text-[10px] px-2.5 py-1 rounded-full border border-[#C5A059]/30 font-prompt text-center font-bold">
                                ✦ DESIGN INTEGRITY SECURED ✦
                              </div>
                            </div>
                          )}
                        </div>

                      </motion.div>
                    </AnimatePresence>

                  </div>

                  {/* Move Controllers bottom bar */}
                  <div className="bg-[#0B1422] border-t border-[#C5A059]/20 px-6 py-4 flex items-center justify-between">
                    <button
                      onClick={prevSlide}
                      className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-[#13223A] border border-[#C5A059]/15 hover:border-[#C5A059]/40 px-4 py-2 rounded-xl transition"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> หน้าที่แล้ว
                    </button>
                    
                    {/* Dots indicators */}
                    <div className="flex gap-2">
                      {slidesContent.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'bg-[#C5A059] w-6' : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextSlide}
                      className="flex items-center gap-2 text-xs font-bold text-white hover:bg-[#1A2B48] bg-[#13223A] border border-[#C5A059]/15 hover:border-[#C5A059]/40 px-4 py-2 rounded-xl transition"
                    >
                      ถัดไป <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    </button>
                  </div>

                </div>

                {/* Call to action container */}
                <div className="bg-[#13223A]/90 p-6 rounded-3xl border border-[#C5A059]/20 shadow-xl text-center flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-left space-y-1">
                    <h4 className="text-base font-bold font-prompt text-white">พร้อมลองจัดสกัดทิศทางงานของคุณแล้วหรือยังครับ?</h4>
                    <p className="text-xs text-slate-300">ขยับมาสลับแท็บเครื่องมือจำลองเพื่อฝึกเขียนสูตรคำสั่งและรับเอาผลลัพธ์อินโฟกันทันที</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('sandbox');
                      if(!generatedOutput && !isGenerating) generateInfographic();
                    }}
                    className="bg-[#C5A059] text-[#0F1A2C] hover:bg-[#B5914E] px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    เปิดเครื่องมือ Sandbox <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 2: INTERACTIVE INSTRUCTION TOOL SANDBOX */}
            {activeTab === 'sandbox' && (
              <motion.div
                key="sandbox"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                
                {/* Left controls box */}
                <div className="lg:col-span-5 bg-[#13223A] rounded-3xl p-6 border border-[#C5A059]/30 shadow-xl space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/10">
                    <h3 className="text-base font-bold font-prompt text-white flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-[#C5A059]" /> สเป็กงานวิเคราะห์ของคุณ
                    </h3>
                    <span className="text-[10px] text-[#C5A059]/75 font-mono">Notebook Sandbox</span>
                  </div>

                  {/* Preset Buttons Pick */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block">เลือกรับเคสกรณีตัวอย่างเพื่อให้ครูช่วยนำทาง:</label>
                    <div className="flex flex-col gap-1.5">
                      {PRESETS.map((pr) => (
                        <button
                          key={pr.id}
                          onClick={() => handlePresetSelect(pr.id)}
                          className={`text-xs text-left p-3 rounded-xl border transition ${
                            selectedPreset === pr.id 
                              ? 'bg-[#C5A059]/20 border-[#C5A059] text-white font-semibold' 
                              : 'bg-[#0B1422] hover:bg-[#1E304E] border-[#C5A059]/10 text-slate-200'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{pr.title}</span>
                            <span className="text-[9px] bg-[#C5A059]/20 text-[#C5A059] font-mono px-2 py-0.5 rounded leading-none border border-[#C5A059]/20">
                              {pr.keyword}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom fields */}
                  <div className="space-y-4 pt-1">
                    <div className="space-y-1.5">
                      <label htmlFor="biz-type" className="text-xs font-bold text-[#C5A059] font-prompt block">ประเด็นชื่อแบรนด์/ประเภทเมนู:</label>
                      <input
                        id="biz-type"
                        type="text"
                        value={businessType}
                        onChange={(e) => { setBusinessType(e.target.value); setSelectedPreset(''); }}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#C5A059]/20 bg-[#0B1422] text-[#F5F5F0] focus:bg-[#070D17] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 transition"
                        placeholder="เช่น OTOP สบู่ถ่านไม้ไผ่พรีเมียม"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="aud-type" className="text-xs font-bold text-[#C5A059] font-prompt block">กลุ่มเป้าหมายผู้บริโภคหลัก:</label>
                      <input
                        id="aud-type"
                        type="text"
                        value={targetAudience}
                        onChange={(e) => { setTargetAudience(e.target.value); setSelectedPreset(''); }}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#C5A059]/20 bg-[#0B1422] text-[#F5F5F0] focus:bg-[#070D17] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 transition"
                        placeholder="เช่น กลุ่มวัยรุ่นรักผิวพรรณที่กังวลปัญหาสิวอุดตัน"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="raw-ctx" className="text-xs font-bold text-[#C5A059] font-prompt block">คลังข้อมูลวัตถุดิบ (Source / Raw Content):</label>
                      <textarea
                        id="raw-ctx"
                        rows={4}
                        value={rawContext}
                        onChange={(e) => { setRawContext(e.target.value); setSelectedPreset(''); }}
                        className="w-full text-xs p-3.5 rounded-xl border border-[#C5A059]/20 bg-[#0B1422] text-[#F5F5F0] focus:bg-[#070D17] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 transition font-sarabun leading-normal text-slate-100"
                        placeholder="ป้อนดีเทล ประโยชน์ สารสกัดที่ต้องการให้สมองอัจฉริยะสรุป..."
                      />
                    </div>

                    {/* Layout Format Selector */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#C5A059] font-prompt block">รูปแบบเลย์เอาต์บน Canva ที่วางแผนไว้:</span>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setFormatType('3parts')}
                          className={`p-3 rounded-xl border text-center text-xs transition ${
                            formatType === '3parts' 
                              ? 'bg-[#C5A059]/20 border-[#C5A059] text-white font-semibold' 
                              : 'bg-[#0B1422] border-[#C5A059]/10 text-slate-300 hover:bg-[#1E304E]'
                          }`}
                        >
                          📦 โครงสร้าง 3 ส่วนหลัก
                        </button>
                        <button
                          onClick={() => setFormatType('comparison')}
                          className={`p-3 rounded-xl border text-center text-xs transition relative ${
                            formatType === 'comparison' 
                              ? 'bg-[#C5A059]/20 border-[#C5A059] text-white font-semibold' 
                              : 'bg-[#0B1422] border-[#C5A059]/10 text-slate-300 hover:bg-[#1E304E]'
                          }`}
                        >
                          ⚖️ ตารางเปรียบเทียบ (Before-After)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Compilation formula status box */}
                  <div className="bg-[#0B1422] rounded-2xl p-4 border border-[#C5A059]/15">
                    <span className="text-[10px] text-[#C5A059] uppercase tracking-wider font-bold block mb-1">
                      🔍 ปริยายสูตรคำสั่งที่ระบบสร้าง (4-Part Formula Prompt Preview)
                    </span>
                    <p className="text-[10.5px] text-slate-300 italic max-h-[100px] overflow-y-auto leading-relaxed font-mono">
                      {`[P] Creative Director... [E] Expert in simplifying... [T] Analyze details of "${businessType}" to extract key messages for "${targetAudience}"... [F] Style as ${formatType === 'comparison' ? 'Compare Before vs After Grid' : '3-Part structure copy'}.`}
                    </p>
                  </div>

                  {/* Submission Button */}
                  <button
                    onClick={generateInfographic}
                    disabled={isGenerating || !businessType.trim()}
                    className={`w-full py-3.5 rounded-xl font-prompt text-xs font-bold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 ${
                      isGenerating 
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-[#C5A059] text-[#0F1A2C] hover:bg-[#B5914E] hover:scale-[1.02]'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#0F1A2C]" />
                        ไม่รีบนะครับ ค่อยเป็นค่อยไป สมองกำลังวิเคราะห์...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#0F1A2C]" />
                        ร่ายเวทมนตร์ด้วย NotebookAI ✨
                      </>
                    )}
                  </button>

                  {errorMsg && (
                    <div className="bg-[#2D1A1E] text-red-400 text-xs p-3 rounded-xl border border-red-800/30">
                      {errorMsg}
                    </div>
                  )}

                </div>

                {/* Right Canva mockup card visualizer */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  
                  {/* Canva Graphic Simulated Plate container */}
                  <div className="bg-[#13223A] rounded-3xl p-6 border border-[#C5A059]/30 shadow-xl flex-1 flex flex-col justify-between animate-fadeIn">
                    
                    <div>
                      <div className="flex items-center justify-between mb-4 border-b border-[#C5A059]/15 pb-3">
                        <span className="text-xs font-semibold text-[#C5A059] flex items-center gap-1.5 font-prompt">
                          <CheckCircle className="w-4 h-4 text-[#C5A059]" /> ผังงานจำลองต้นทางแบบประชดงามบน Canva
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Copy text to Canva</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-6">
                        นี่คือโครงสร้างคำโฆษณาพรีเมียมที่สกัดเสร็จตามหลักจิตวิทยาการย่อยความรู้ สามารถกดคัดลอก (Copy Icon) ไปก๊อปปี้วางในช่องกล่องข้อความบน Canva ชิ้นต่อชิ้นเพื่อความสมดุลสายตาได้ง่ายๆ ครับ สังเกตว่าอักษรจะไม่ปูดแน่นเกินไป
                      </p>

                      {generatedOutput ? (
                        <div className="space-y-6 relative">
                          
                          {/* Simulated Poster Card Mockup representation */}
                          <div id="simulated-canva-poster" className="bg-[#060D17] p-6 sm:p-8 rounded-2xl text-white relative overflow-hidden border-2 border-[#C5A059]/50 shadow-inner">
                            {/* Decorative gold emblem line backing */}
                            <div className="absolute top-0 right-0 w-32 h-32 border-[#C5A059]/20 border-r-2 border-t-2 rounded-tr-xl opacity-40 pointer-events-none" />
                            <div className="absolute -bottom-10 -left-10 w-44 h-44 border-l border-b border-[#C5A059]/15 rounded-bl-3xl opacity-30 pointer-events-none" />
                            
                            {/* Topic Category */}
                            <span className="text-[10px] font-prompt font-semibold text-[#C5A059] uppercase tracking-widest block mb-2 text-center md:text-left">
                              ✦ {businessType} PRESET INFOGRAPHIC ✦
                            </span>

                            {/* Section 1: Headline */}
                            <div className="relative group border-b border-white/10 pb-4 mb-4">
                              <span className="text-[9px] font-mono text-slate-400 block mb-1">PART 1: MAIN HEADLINE (หัวข้อพาดหัวทรงพลัง)</span>
                              <div className="flex justify-between items-start gap-4">
                                <h4 className="text-lg sm:text-xl font-bold font-prompt text-white tracking-snug">
                                  {generatedOutput.headline}
                                </h4>
                                <button
                                  onClick={() => copyToClipboard(generatedOutput.headline, 'headline')}
                                  className="text-slate-400 hover:text-[#C5A059] p-1 rounded-md hover:bg-white/10 transition-all"
                                  title="คัดลอกหินสลักพาดหัว"
                                >
                                  {copiedSection === 'headline' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            {/* Section 2: Takeaways OR Comparison List */}
                            <div className="pb-4 mb-4 border-b border-white/10">
                              
                              {/* Option A: Three parts takeaways */}
                              {generatedOutput.takeaways && (
                                <div className="space-y-4">
                                  <span className="text-[9px] font-mono text-slate-400 block mb-2">PART 2: THREE KEY TAKEAWAYS (เนื้อหาย่อย 3 ประโยคหลอมสบายตา)</span>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {generatedOutput.takeaways.map((item, index) => (
                                      <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-3 relative group">
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all">
                                          <button
                                            onClick={() => copyToClipboard(`**${item.title}**\n${item.detail}`, `t-${index}`)}
                                            className="text-slate-400 hover:text-[#C5A059] p-1 rounded transition-all"
                                            title="คัดลอกข้อนี้"
                                          >
                                            {copiedSection === `t-${index}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                          </button>
                                        </div>
                                        <span className="font-bold font-prompt text-xs text-[#C5A059] block mb-1">
                                          0{index + 1}. {item.title}
                                        </span>
                                        <p className="text-[11px] text-slate-200 leading-relaxed">
                                          {item.detail}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Option B: Comparison grid */}
                              {generatedOutput.beforeItems && generatedOutput.afterItems && (
                                <div className="space-y-3">
                                  <span className="text-[9px] font-mono text-slate-400 block mb-2">PART 2: COMPARISON MATRIX (ตารางเทียบชีวิตเปลี่ยนกระโดด)</span>
                                  <div className="grid grid-cols-2 gap-4">
                                    
                                    {/* Before Column */}
                                    <div className="bg-red-950/20 border border-red-500/10 rounded-xl p-3">
                                      <h5 className="text-[11px] font-bold font-prompt text-red-500 uppercase tracking-wider mb-2 text-center">❌ แบบเดิมที่ต้องทนเผชิญ</h5>
                                      <ul className="space-y-2">
                                        {generatedOutput.beforeItems.map((bi, idx) => (
                                          <li key={idx} className="text-[10.5px] leading-relaxed text-red-200 list-disc list-inside">
                                            {bi}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* After Column */}
                                    <div className="bg-[#122A1E]/30 border border-emerald-500/20 rounded-xl p-3">
                                      <h5 className="text-[11px] font-bold font-prompt text-emerald-400 uppercase tracking-wider mb-2 text-center">✨ หลังสัมผัสพลังพรีเมียม</h5>
                                      <ul className="space-y-2">
                                        {generatedOutput.afterItems.map((ai, idx) => (
                                          <li key={idx} className="text-[10.5px] leading-relaxed text-emerald-200 list-inside list-disc">
                                            {ai}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                  </div>
                                </div>
                              )}

                            </div>

                            {/* Section 3: Call to action */}
                            <div className="relative group">
                              <span className="text-[9px] font-mono text-slate-400 block mb-1">PART 3: BRAND CALL TO ACTION (กระตุ้นพฤติกรรมสุดท้าย)</span>
                              <div className="flex justify-between items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                                <p className="text-xs font-semibold text-[#E5C07B] italic">
                                  {generatedOutput.cta}
                                </p>
                                <button
                                  onClick={() => copyToClipboard(generatedOutput.cta, 'cta')}
                                  className="text-slate-400 hover:text-[#C5A059] p-1 rounded-md hover:bg-white/10 transition-all"
                                  title="คัดลอก CTA"
                                >
                                  {copiedSection === 'cta' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                          </div>

                          {/* Quick instruction notice */}
                          <div className="flex items-center gap-2.5 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-2xl p-4 text-slate-200 text-xs">
                            <Lightbulb className="w-5 h-5 text-[#C5A059] shrink-0" />
                            <span>
                              <strong>คำแนะนำของครูเด่น:</strong> ใน Canva ลองพิจารณาใช้ฟอนต์ชื่อ <strong>Prompt (Semi-Bold)</strong> สำหรับตัวอักษรหัวข้อพาดหัว และฟอนต์ <strong>Sarabun</strong> เพื่อให้อินโฟของเรามองดูสุภาพ สะอาดสายตา และเรียบหรูสากลที่สุดครับ
                            </span>
                          </div>

                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-12 bg-[#0B1422] border border-dashed border-[#C5A059]/20 rounded-2xl">
                          <Layers className="w-12 h-12 text-[#C5A059]/40 stroke-1 mb-3 animate-pulse" />
                          <p className="text-xs text-slate-400">ยังไม่มีข้อมูลสวรรค์จำลอง กรุณาป้อนข้อมูลฝั่งซ้ายแล้วร่ายเวทมนตร์ด้วย NotebookAI นะครับ</p>
                        </div>
                      )}

                    </div>

                    <div className="border-t border-[#C5A059]/15 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                      <span className="text-xs text-slate-400 inline-flex items-center gap-1">
                        <Smile className="w-4 h-4 text-[#C5A059]" /> “ไม่สมบูรณ์แบบก็ไม่เป็นไร เรียนรู้ด้วยหัวใจที่สดใสนะครับ”
                      </span>
                      <button
                        onClick={() => {
                          const allTexts = generatedOutput 
                            ? `${generatedOutput.headline}\n\n${
                                generatedOutput.takeaways 
                                  ? generatedOutput.takeaways.map((t, idx) => `0${idx+1}. ${t.title}: ${t.detail}`).join('\n') 
                                  : `Before:\n${generatedOutput.beforeItems?.join('\n')}\nAfter:\n${generatedOutput.afterItems?.join('\n')}`
                              }\n\n${generatedOutput.cta}`
                            : '';
                          if(allTexts) copyToClipboard(allTexts, 'copy-all');
                        }}
                        disabled={!generatedOutput}
                        className="bg-[#0B1422] hover:bg-[#1E304E] text-white border border-[#C5A059]/20 hover:border-[#C5A059]/50 shadow-md text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-2"
                      >
                        {copiedSection === 'copy-all' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-[#C5A059]" />}
                        คัดลอกข้อเขียนทั้งหมดทีเดียว
                      </button>
                    </div>

                  </div>

                </div>

              </motion.div>
            )}

            {/* TAB 3: EMOTIONAL DIALOGUE WITH "ครูเด่น" */}
            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto space-y-6"
              >
                {/* Chat window container */}
                <div className="bg-[#13223A] rounded-3xl border border-[#C5A059]/30 shadow-2xl flex flex-col h-[520px] overflow-hidden justify-between animate-fadeIn">
                  
                  {/* Chat header */}
                  <div className="bg-gradient-to-r from-[#0F1A2C] to-[#1C3254] p-4 text-white flex items-center justify-between border-b border-[#C5A059]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0B1422] flex items-center justify-center border border-[#C5A059] shadow-inner text-white font-bold text-center">
                        <span className="text-[#C5A059] font-prompt">ด</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold font-prompt text-white">ครูเด่น (Facilitator เพื่อนเคียงข้างใจ)</h4>
                        <span className="text-[10px] text-[#C5A059] block">ผู้เชี่ยวชาญการถอดรหัสความรู้และจิตใจแบรนด์</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full inline-flex items-center gap-1 animate-pulse">
                      🌱 คลื่นสายใยดนตรีหัวใจ
                    </span>
                  </div>

                  {/* Messages Feed body */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0B1422] relative">
                    
                    {chatLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={`flex ${log.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                            log.sender === 'user'
                              ? 'bg-[#C5A059] text-[#0F1A2C] font-semibold rounded-br-none'
                              : 'bg-[#1C3254] text-slate-100 border border-[#C5A059]/15 rounded-bl-none'
                          }`}
                        >
                          {log.sender === 'den' && (
                            <span className="text-[9px] font-bold font-prompt text-[#C5A059] uppercase block mb-1">
                              ครูเด่น มาสเตอร์ฟา
                            </span>
                          )}
                          <p className="whitespace-pre-wrap">{log.text}</p>
                        </div>
                      </div>
                    ))}

                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-[#1C3254] border border-[#C5A059]/15 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-2">
                          <span className="text-[10px] text-[#C5A059] font-bold animate-pulse">
                            ครูเด่นกำลังสดับตรรกจิตใจและขบคิดคัดคำ...
                          </span>
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
                          </span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* User Input controls */}
                  <form onSubmit={sendChatMessage} className="bg-[#13223A] p-3 border-t border-[#C5A059]/15 flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="เช่น 'ครูครับ ผมรู้สึกกังวลว่าตัวเองคิดหัวข้อสไลด์ไม่ออก มีไอเดียย่อยอย่างไรบ้าง...'"
                      className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#C5A059]/20 bg-[#0B1422] text-[#F5F5F0] focus:bg-[#070D17] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 transition"
                      disabled={isChatLoading}
                    />
                    <button
                      type="submit"
                      disabled={isChatLoading || !chatInput.trim()}
                      className={`px-5 py-2 rounded-xl text-xs font-bold shadow-sm transition ${
                        isChatLoading || !chatInput.trim()
                          ? 'bg-[#0B1422] text-slate-500 border border-[#C5A059]/10 cursor-not-allowed'
                          : 'bg-[#C5A059] text-[#0F1A2C] hover:bg-[#B5914E]'
                      }`}
                    >
                      ส่งความกังวล
                    </button>
                  </form>

                </div>

                {/* Preset warm FAQs to encourage interaction */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-300 block">กดแตะคำถามเพื่อลดความเหงาและเริ่มเรียนพาที:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    
                    <button
                      onClick={() => {
                        setChatInput("ครูเด่นครับ ผมรู้สึกว่าตรรกดีไซน์ของผมมันไม่พรีเมียมพอที่จะสู้แบรนด์ต่างชาติได้เลย กังวลจังครับ");
                      }}
                      className="text-xs text-left p-3 rounded-xl bg-[#13223A] border border-[#C5A059]/10 hover:border-[#C5A059] transition text-slate-200 block hover:bg-[#1E304E]"
                    >
                      “กังวลใจเรื่องมาตรฐานสากลแบรนด์วิถีไทย?” 🏮
                    </button>

                    <button
                      onClick={() => {
                        setChatInput("ครูครับ บางทีเวลาลูกค้าสั่งแก้อินโฟ ผมจะเริ่มอึดอัดจิตและตึงมือมากครับ มีวิธีวางฟิกซ์สมดุลอารมณ์ยังไงไหมครับ");
                      }}
                      className="text-xs text-left p-3 rounded-xl bg-[#13223A] border border-[#C5A059]/10 hover:border-[#C5A059] transition text-slate-200 block hover:bg-[#1E304E]"
                    >
                      “เมื่อเจอลูกค้าให้ปรับแต่งแก้งานบ่อย ๆ ?” ⚖️
                    </button>

                    <button
                      onClick={() => {
                        setChatInput("ช่วยอธิบายข้อคิดที่แท้จริงให้การตั้งกรอบเรียนรู้เครื่องมือ AI อย่างมีความสุขที่สุดหน่อยครับ ครูเด่น");
                      }}
                      className="text-xs text-left p-3 rounded-xl bg-[#13223A] border border-[#C5A059]/10 hover:border-[#C5A059] transition text-slate-200 block hover:bg-[#1E304E]"
                    >
                      “หลักความสุขในการยอมรับเทคโนโลยี AI?” 🌱
                    </button>

                    <button
                      onClick={() => {
                        setChatInput("อยากให้ครูเด่นอวยพรให้กำลังใจในการเริ่มส่งผลงานประกบใน Canva วันนี้หน่อยครับ!");
                      }}
                      className="text-xs text-left p-3 rounded-xl bg-[#13223A] border border-[#C5A059]/10 hover:border-[#C5A059] transition text-slate-200 block hover:bg-[#1E304E]"
                    >
                      “อยากขอเกร็ดอวยพรมงคลในการเริ่มต้นลงมือ?” ✦
                    </button>

                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 4: INTERACTIVE DUAL WORKSHOP GUIDE */}
            {activeTab === 'guide' && (() => {
              const currentStepData = (activeStepsList[currentGuideStep] || activeStepsList[0]) as any;
              return (
                <motion.div
                  key="guide"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 animate-fadeIn"
                >
                  {/* Introduction Warm Banner */}
                  <div className="bg-[#13223A] rounded-3xl p-6 border border-[#C5A059]/30 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#C5A059]/5 rounded-full filter blur-xl pointer-events-none" />
                    <div className="flex flex-col md:flex-row items-center gap-5 relative z-10">
                      <div className="w-14 h-14 rounded-full bg-[#C5A059] flex items-center justify-center border-2 border-white text-[#0F1A2C] font-bold text-xl font-prompt shadow-md shrink-0">
                        ด
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold font-prompt text-white flex flex-wrap items-center gap-2">
                          <span>ห้องเก็บบันทึกปัญญาอัจฉริยะ (Workshop Library)</span>
                          <span className="text-xs font-normal text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/30 px-2.5 py-0.5 rounded-full">
                            {selectedGuideType === 'notebooklm' ? 'NotebookLM 8 ขั้นตอน' : 'ChatGPT Prompt 5 ขั้นตอน'}
                          </span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-sarabun">
                          “ยินดีต้อนรับกลับสู้พื้นที่ประคองรักเรียนรู้ครับลูก ครูเด่นและทีมงานได้ทำการจัดวางคู่มือจริงพร้อมรูปภาพอธิบายจับมือทำ 2 ส่วนหลักคือการนำข้อมูลเข้า <strong>NotebookLM</strong> และการประยุกต์วางกฎ <strong>System Prompt บน ChatGPT</strong> เพื่อเค้นเนื้อหาพรีเมียมไปผลิตงาน Canva ได้แบบไร้กังวลครับ เลือกศึกษาทีละหัวข้อด้วยใจสบายๆ นะครับ”
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Guide Selector Sub-tabs */}
                  <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-[#0B1422] rounded-2xl border border-[#C5A059]/15">
                    <button
                      onClick={() => {
                        setSelectedGuideType('notebooklm');
                        setCurrentGuideStep(0);
                        setIsGuideImageModalOpen(false);
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2.5 font-prompt ${
                        selectedGuideType === 'notebooklm'
                          ? 'bg-[#C5A059] text-[#0F1A2C] shadow-md scale-101'
                          : 'text-slate-400 hover:text-white hover:bg-[#13223A]/50'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 shrink-0" />
                      <span>📘 1. คู่มือวิจัยเจาะหัวข้อ ด้วย NotebookLM ({GUIDE_STEPS.length} ขั้นตอน)</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGuideType('chatgpt_prompt');
                        setCurrentGuideStep(0);
                        setIsGuideImageModalOpen(false);
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2.5 font-prompt ${
                        selectedGuideType === 'chatgpt_prompt'
                          ? 'bg-[#C5A059] text-[#0F1A2C] shadow-md scale-101'
                          : 'text-slate-400 hover:text-white hover:bg-[#13223A]/50'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>🤖 2. คู่มือคุมกฎดีไซน์ ด้วย ChatGPT System Prompt ({CHATGPT_PROMPT_STEPS.length} ขั้นตอน)</span>
                    </button>
                  </div>

                  {/* Steps Layout Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Column: Vertical Step List Selection */}
                    <div className="lg:col-span-4 space-y-2.5">
                      <div className="text-xs font-mono tracking-widest text-[#C5A059] uppercase px-1 font-bold">
                        {selectedGuideType === 'notebooklm' ? 'สารบัญขั้น NotebookLM' : 'สารบัญขั้น ChatGPT'} ({activeStepsList.length} Steps)
                      </div>
                      <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#C5A059]/20">
                        {activeStepsList.map((step, idx) => (
                          <button
                            key={step.id}
                            onClick={() => {
                              setCurrentGuideStep(idx);
                              setIsGuideImageModalOpen(false);
                            }}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                              idx === currentGuideStep
                                ? 'bg-[#C5A059] text-[#0F1A2C] border-[#C5A059] shadow-md font-semibold font-prompt translate-x-1'
                                : 'bg-[#13223A] text-slate-300 border-[#C5A059]/15 hover:border-[#C5A059]/40 hover:bg-[#1C3254]'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                                idx === currentGuideStep
                                  ? 'bg-[#0F1A2C] text-[#C5A059]'
                                  : 'bg-[#0B1422] text-[#C5A059]'
                              }`}>
                                0{step.id}
                              </span>
                              <div className="min-w-0 pr-1">
                                <span className="text-xs sm:text-sm block truncate">
                                  {step.title.replace(/^\d+\.\s*/, '')}
                                </span>
                                <span className={`text-[10px] block mt-0.5 truncate ${
                                  idx === currentGuideStep ? 'text-[#0F1A2C]/80' : 'text-slate-400'
                                }`}>
                                  {step.badge}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 shrink-0 opacity-70 transition ${
                              idx === currentGuideStep ? 'rotate-90 text-[#0F1A2C]' : ''
                            }`} />
                          </button>
                        ))}
                      </div>
                    </div>

                  {/* Right Column: Dynamic Step Presentation Screen */}
                  <div className="lg:col-span-8">
                    <div className="bg-[#13223A] border border-[#C5A059]/25 rounded-3xl p-6 shadow-xl space-y-6">
                      
                      {/* Step Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C5A059]/15 pb-4">
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 text-[10px] text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono">
                            <Award className="w-3.5 h-3.5" />
                            {currentStepData.badge}
                          </span>
                          <h2 className="text-base sm:text-xl font-bold font-prompt text-white">
                            {currentStepData.title}
                          </h2>
                          <p className="text-xs text-[#C5A059] font-medium font-sans">
                            {currentStepData.sub}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-mono font-bold text-[#C5A059]/30">
                            0{currentStepData.id}/0{activeStepsList.length}
                          </span>
                        </div>
                      </div>

                      {/* Step Description */}
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#0B1422] p-4 rounded-xl border border-[#C5A059]/10 font-sarabun whitespace-pre-wrap">
                        {currentStepData.desc}
                      </p>

                      {/* Optional Copyable System Prompt Block */}
                      {currentStepData.showPromoPrompt && (
                        <div className="bg-[#0B1422] border border-[#C5A059]/35 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-1.5 bg-[#C5A059]/10 text-[#C5A059] text-[9px] uppercase tracking-wider font-bold rounded-bl-xl border-l border-b border-[#C5A059]/20 font-mono">
                            คัดลอกวิเศษ
                          </div>
                          <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059] font-prompt">
                            <Sparkles className="w-4 h-4 text-[#C5A059]" />
                            <span>ชุดคำสั่ง System Prompt สำหรับอบรม (Copy to Clipboard)</span>
                          </div>
                          <div className="text-slate-300 text-xs font-mono bg-[#111A28] rounded-xl p-3 border border-slate-800/40 select-all leading-relaxed whitespace-pre-wrap max-h-[160px] overflow-y-auto">
                            {currentStepData.promoPromptText}
                          </div>
                          <button
                            onClick={() => {
                              copyToClipboard(currentStepData.promoPromptText || "", "promo-prompt");
                              setCopiedSection("promo-prompt");
                              setTimeout(() => setCopiedSection(null), 3000);
                            }}
                            className="w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 bg-[#C5A059] text-[#0F1A2C] hover:bg-[#B5914E]"
                          >
                            {copiedSection === "promo-prompt" ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>คัดลอกข้อสั่งวิเศษสำเร็จแล้วนะคร้าบ! 🎉</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>คลิกเพื่อคัดลอกชุดคำสั่ง (Copy System Prompt) 📋</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Call to External Real URL */}
                      {currentStepData.link && (
                        <div className="bg-[#1C3254]/50 border border-[#C5A059]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="min-w-0 text-center sm:text-left">
                            <span className="text-[10px] block text-slate-400 font-mono">ลิงก์ข้ามไปยังช่องทางการใช้จริง</span>
                            <span className="text-xs text-[#C5A059] block font-medium truncate max-w-sm hover:underline">
                              <a href={currentStepData.link} target="_blank" rel="noopener noreferrer">
                                {currentStepData.link}
                              </a>
                            </span>
                          </div>
                          <a
                            href={currentStepData.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#C5A059] text-[#0F1A2C] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:bg-[#B5914E] transition-all flex items-center gap-1.5 shrink-0"
                          >
                            <span>{currentStepData.linkLabel}</span>
                          </a>
                        </div>
                      )}

                      {/* Image Preview Container */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono font-bold text-slate-400 flex items-center justify-between px-1">
                          <span>📸 ภาพประกอบหน้าจอจริง (Actual Screenshot)</span>
                          <span className="text-xs text-[#C5A059] animate-pulse">🔍 แตะเพื่อซูม</span>
                        </div>
                        <div 
                          onClick={() => setIsGuideImageModalOpen(true)}
                          className="relative h-[220px] sm:h-[360px] w-full rounded-2xl overflow-hidden border border-[#C5A059]/20 shadow-md group cursor-pointer"
                        >
                          <Image
                            src={currentStepData.image}
                            alt={currentStepData.title}
                            fill
                            className="object-cover object-top group-hover:scale-102 transition duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                            <div className="bg-[#0F1A2C]/95 text-white border border-[#C5A059] rounded-xl px-4 py-2 text-xs font-bold shadow-2xl flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-[#C5A059]" />
                              คลิกเพื่อขยายดูเต็มจอ
                            </div>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 italic text-center">
                          {selectedGuideType === 'notebooklm' 
                            ? "* ถ่ายภาพจากฟังก์ชันต้นฉบับจริงใน NotebookLM เพื่อให้ผู้เรียนปรับจังหวะเมนูและมองภาพรวมตรงกลุ่มงานอย่างแม่นยำ" 
                            : "* ถ่ายภาพจากหน้าจอ ChatGPT จริง เพื่อช่วยประกอบจังหวะการสร้างแบรนด์อย่างมีความสุขและพรีเมียม"}
                        </p>
                      </div>

                      {/* Coach Den's Warm Advice card */}
                      <div className="bg-gradient-to-r from-[#0F1A2C] to-[#1C3254] rounded-2xl p-4 sm:p-5 border-l-4 border-[#C5A059] relative overflow-hidden font-sarabun">
                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#C5A059]/5 rounded-full filter blur-xl pointer-events-none" />
                        <div className="flex gap-3.5 items-start font-sarabun">
                          <div className="w-9 h-9 rounded-full bg-[#1C3254] flex items-center justify-center border border-[#C5A059]/40 text-[#C5A059] shrink-0">
                            <Smile className="w-5 h-5 font-sarabun" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-[#C5A059] tracking-wider block font-prompt">
                              ครูเด่นฟาสายประคองใจ
                            </span>
                            <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed italic font-medium font-sarabun">
                              {currentStepData.denAdvice}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Previous and Next Navigation Footer Inside Card */}
                      <div className="flex justify-between items-center pt-4 border-t border-[#C5A059]/15">
                        <button
                          onClick={() => {
                            if (currentGuideStep > 0) setCurrentGuideStep(prev => prev - 1);
                          }}
                          disabled={currentGuideStep === 0}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                            currentGuideStep === 0
                              ? 'border-[#C5A059]/10 text-slate-600 cursor-not-allowed bg-transparent'
                              : 'border-[#C5A059]/30 text-white hover:bg-[#C5A059]/10 hover:text-[#C5A059]'
                          }`}
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>ขั้นตอนก่อนหน้า</span>
                        </button>

                        <button
                          onClick={() => {
                            if (currentGuideStep < activeStepsList.length - 1) setCurrentGuideStep(prev => prev + 1);
                          }}
                          disabled={currentGuideStep === activeStepsList.length - 1}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                            currentGuideStep === activeStepsList.length - 1
                              ? 'border-[#C5A059]/10 text-slate-600 cursor-not-allowed bg-transparent'
                              : 'bg-[#C5A059] text-[#0F1A2C] hover:bg-[#B5914E]'
                          }`}
                        >
                          <span>ขั้นตอนถัดไป</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
                </motion.div>
              );
            })()}

          </AnimatePresence>
        </div>

        {/* --- Image Zoom Modal for Step Screenshots --- */}
        <AnimatePresence>
          {isGuideImageModalOpen && (() => {
            const currentZoomStepData = activeStepsList[currentGuideStep] || activeStepsList[0];
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-[#070D17]/95 z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out"
                onClick={() => setIsGuideImageModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl bg-[#13223A] border border-[#C5A059]/35 rounded-3xl p-4 sm:p-6 overflow-hidden flex flex-col gap-4 shadow-2xl cursor-default"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-[#C5A059]/15 pb-2.5">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white font-prompt truncate">
                        {currentZoomStepData.title}
                      </h4>
                      <p className="text-xs text-[#C5A059] font-sans">
                        {currentZoomStepData.badge} • ภาพหน้าจอจริงประกอบการใช้งานประกอบสรรค์สร้าง
                      </p>
                    </div>
                    <button
                      onClick={() => setIsGuideImageModalOpen(false)}
                      className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl text-xs font-bold transition border border-rose-500/20 shadow-sm"
                    >
                      ปิดภาพขยาย (Close)
                    </button>
                  </div>

                  <div className="relative w-full h-[60vh] rounded-xl overflow-hidden border border-[#C5A059]/10 bg-[#0B1422] flex items-center justify-center">
                    <Image
                      src={currentZoomStepData.image}
                      alt={currentZoomStepData.title}
                      fill
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-300">
                    <div className="flex items-center gap-2 text-xs font-sarabun">
                      <Smile className="w-4 h-4 text-[#C5A059]" />
                      <span>ครูเด่นแนะ: {currentZoomStepData.sub}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      ภาพต้นแบบระดับคุณภาพ เพื่อให้ผู้เข้าอบรมเรียนรู้ด้วยความสุขสงบ
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* --- Footer Signature --- */}
        <footer className="mt-12 pt-6 border-t border-[#C5A059]/15 text-center text-slate-400 space-y-2">
          <p className="text-xs">
            © 2026 Designed for Workshop: NotebookLM for Design Research and Content Strategy. All rights reserved.
          </p>
          <div className="flex justify-center items-center gap-3 text-[11px] text-slate-400">
            <span>จัดทำโดย: <strong>Senior Art Director & ครูเด่น มาสเตอร์ฟา</strong></span>
            <span>•</span>
            <a href="https://capvisionpartner.com/speakers/den-masterfa" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:underline font-semibold flex items-center gap-1">
              Capvision Partner Profile <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </footer>

      </main>

    </div>
  );
}
