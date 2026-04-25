/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Rocket, 
  Cpu, 
  Gamepad2, 
  Code2, 
  Plane, 
  Trophy, 
  Users, 
  Calendar, 
  ChevronRight, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Star,
  CheckCircle2,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <img 
    src="/logo.png" 
    alt="臻成青少编程 Logo" 
    className={`${className} object-contain`}
    referrerPolicy="no-referrer"
  />
);

// --- Constants & Data ---

const NAV_LINKS = [
  { name: '首页', href: '#home' },
  { name: '为什么学编程', href: '#why' },
  { name: '课程体系', href: '#curriculum' },
  { name: '赛事服务', href: '#game' },
  { name: '师资力量', href: '#teachers' },
  { name: '预约试听', href: '#booking' },
];

const CURRICULUM_LADDER = [
  {
    title: '图形化编程 (Scratch)',
    level: '基础入门',
    age: '6-9岁',
    color: 'bg-orange-500',
    accentColor: '#f97316',
    description: '通过积木式拖拽，培养编程逻辑，创作动画和游戏。',
    features: ['逻辑思维', '空间想象', '游戏设计'],
    icon: <Gamepad2 className="w-6 h-6" />,
    illustration: (
      <svg className="w-full h-full opacity-30" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="30" rx="4" fill="white" />
        <rect x="30" y="55" width="80" height="30" rx="4" fill="white" />
        <circle cx="150" cy="40" r="15" fill="white" fillOpacity="0.5" />
        <path d="M140 80L160 100M160 80L140 100" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 110C50 90 150 90 190 110" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
    )
  },
  {
    title: 'Python 趣味编程',
    level: '编程进阶',
    age: '9-12岁',
    color: 'bg-blue-500',
    accentColor: '#3b82f6',
    description: '人工智能时代首选语言，从趣味语法到实际应用开发。',
    features: ['语法基础', '自动化脚本', 'AI初步'],
    icon: <Code2 className="w-6 h-6" />,
    illustration: (
      <svg className="w-full h-full opacity-30" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 20C40 20 80 10 90 40C100 70 60 70 50 100" stroke="white" strokeWidth="8" strokeLinecap="round" />
        <circle cx="140" cy="30" r="10" fill="white" />
        <circle cx="170" cy="60" r="6" fill="white" />
        <circle cx="145" cy="90" r="8" fill="white" />
        <path d="M140 30L170 60L145 90" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
        <rect x="10" y="10" width="180" height="100" rx="8" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
      </svg>
    )
  },
  {
    title: 'C++/信奥专题',
    level: '专业赛道',
    age: '11岁+',
    color: 'bg-indigo-600',
    accentColor: '#4f46e5',
    description: '对标信息学奥赛(CSP-J/S)，挑战算法巅峰。',
    features: ['数据结构', '核心算法', '竞赛冲刺'],
    icon: <Cpu className="w-6 h-6" />,
    illustration: (
      <svg className="w-full h-full opacity-30" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 20V100M60 40H140M60 80H140" stroke="white" strokeWidth="2" />
        <rect x="85" y="45" width="30" height="30" rx="2" fill="white" />
        <circle cx="40" cy="20" r="4" fill="white" />
        <circle cx="160" cy="100" r="4" fill="white" />
        <path d="M20 10L180 110" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M180 10L20 110" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
      </svg>
    )
  },
  {
    title: '无人机编程专题',
    level: '跨学科拓展',
    age: '8-14岁',
    color: 'bg-green-500',
    accentColor: '#22c55e',
    description: '飞向蓝天，将编程指令带入现实物理世界。',
    features: ['空间操控', '自动飞行', '物理感知'],
    icon: <Plane className="w-6 h-6" />,
    illustration: (
      <svg className="w-full h-full opacity-30" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="60" r="40" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M80 60L120 60M100 40L100 80" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M150 20C170 30 180 50 170 70" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="30" r="10" fill="white" fillOpacity="0.3" />
        <circle cx="40" cy="25" r="8" fill="white" fillOpacity="0.2" />
      </svg>
    )
  }
];

const WHY_PROGRAMMING = [
  {
    title: '锻炼逻辑思维',
    desc: '像数学家一样思考，像工程师一样行动。',
    icon: <Cpu className="text-purple-600" />
  },
  {
    title: '提升创造力',
    desc: '将天马行空的想象，转化为触手可及的作品。',
    icon: <Rocket className="text-blue-500" />
  },
  {
    title: '适应未来趋势',
    desc: '编程是AI时代的通用语言，是未来的必备素养。',
    icon: <Star className="text-orange-500" />
  }
];

const GAME_SERVICES = [
  { name: '教育部白名单赛事', icon: <Trophy /> },
  { name: '全国软件编程等级考试', icon: <CheckCircle2 /> },
  { name: 'CSP-J/S 信奥赛培训', icon: <Code2 /> },
  { name: '蓝桥杯/NOC等专业赛事', icon: <Star /> },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      {/* --- Navbar --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo className="w-12 h-12" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-indigo-900 leading-tight">臻成青少编程</h1>
              <p className="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider">ZhenCheng Training</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-medium hover:text-indigo-600 transition-colors">
                {link.name}
              </a>
            ))}
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
              免费试听
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {NAV_LINKS.map(link => (
                  <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-slate-50">
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="absolute top-20 right-[-10%] w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 left-[-5%] w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-6">
              宜良县·优质编程教育品牌
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              让孩子在编程世界里<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">自由创造，飞向蓝天</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              专注 6-18 岁青少儿编程教育。通过图形化、Python、无人机等趣味课程，培养数字化时代的学习力。
            </p>
            <div className="flex flex-wrap gap-4">
              <button href="#booking" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2">
                立即预约免费试听 <ChevronRight size={20} />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200`} />
                  ))}
                </div>
                <div className="text-sm font-medium text-slate-500 underline">
                  500+ 学员的共同选择
                </div>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-green-500" />
                <span className="text-sm font-semibold">权威教材</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-blue-500" />
                <span className="text-sm font-semibold">4-6人小班制</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-orange-500" />
                <span className="text-sm font-semibold">校门口校区</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <img 
                  src="/logo.png" 
                  alt="ZhenCheng Coding Logo" 
                  className="w-96 h-96 object-contain drop-shadow-[0_20px_50px_rgba(93,70,150,0.3)]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              {/* Decorative elements behind the logo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10%] border-2 border-dashed border-indigo-200/50 rounded-full -z-10"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Why Programming --- */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">为什么要让孩子学习编程？</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {WHY_PROGRAMMING.map((item, idx) => (
              <motion.div 
                key={item.title}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 text-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-indigo-600">
                   {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Language Selection Guide --- */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 italic">编程语言怎么选？看这一张图就够了</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-orange-500 shrink-0 flex items-center justify-center font-bold">1</div>
                   <div>
                      <h4 className="font-bold text-lg mb-1">6-8岁：图形化兴趣班 (Scratch)</h4>
                      <p className="text-slate-300 text-sm">此阶段重在保护兴趣，理解“指令、序列、循环”等计算机基本逻辑。</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-blue-500 shrink-0 flex items-center justify-center font-bold">2</div>
                   <div>
                      <h4 className="font-bold text-lg mb-1">9-11岁：代码跃迁 (Python)</h4>
                      <p className="text-slate-300 text-sm">从拖拽到键盘敲击。Python因其语法自然，是孩子们进入纯代码编程的梯子。</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-indigo-600 shrink-0 flex items-center justify-center font-bold">3</div>
                   <div>
                      <h4 className="font-bold text-lg mb-1">11岁+：专业竞技 (C++)</h4>
                      <p className="text-slate-300 text-sm">直指信奥赛。注重底层逻辑、内存管理和数据结构，适合追求深度的学员。</p>
                   </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-[2rem] border border-white/20 backdrop-blur-md">
               <h4 className="text-center font-bold mb-8 flex items-center justify-center gap-2">
                 <Calendar className="text-orange-400" /> 臻成教学周课表示例
               </h4>
               <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                     <p className="text-slate-400 mb-1">周一至周五</p>
                     <p className="font-bold">18:40 - 20:00</p>
                     <p className="text-orange-400 mt-2 font-bold font-mono">周三限时免费试听</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                     <p className="text-slate-400 mb-1">周六、周日</p>
                     <p className="font-bold">全天多时段可选</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Curriculum Ladder --- */}
      <section id="curriculum" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black mb-4 tracking-tight">我们的课程体系</h2>
              <p className="text-slate-500 font-medium">对标全国软件编程等级考试及信息学奥赛通路</p>
            </div>
            <div className="flex gap-2">
               <div className="px-4 py-2 bg-white rounded-full border border-slate-200 text-xs font-bold shadow-sm">科学</div>
               <div className="px-4 py-2 bg-white rounded-full border border-slate-200 text-xs font-bold shadow-sm">技术</div>
               <div className="px-4 py-2 bg-white rounded-full border border-slate-200 text-xs font-bold shadow-sm">工程</div>
               <div className="px-4 py-2 bg-white rounded-full border border-slate-200 text-xs font-bold shadow-sm">艺术</div>
               <div className="px-4 py-2 bg-white rounded-full border border-slate-200 text-xs font-bold shadow-sm">数学</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {CURRICULUM_LADDER.map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all group lg:hover:-translate-y-2"
              >
                <div className={`h-40 relative overflow-hidden flex items-center justify-center`}>
                   <div className="absolute inset-0 bg-slate-100 group-hover:scale-110 transition-transform duration-700">
                      {item.illustration}
                   </div>
                   <div className={`absolute inset-0 ${item.color} opacity-80 mix-blend-multiply`}></div>
                   <div className="absolute inset-0 p-6 text-white flex flex-col justify-between z-10">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-black/20 rounded-full border border-white/20 uppercase tracking-wider">{item.level}</span>
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30 shadow-lg group-hover:bg-white/30 transition-colors">
                          {item.icon}
                        </div>
                      </div>
                      <h4 className="font-black text-xl">{item.title}</h4>
                   </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-slate-400">建议年龄段：</span>
                    <span className="text-sm font-bold text-indigo-600">{item.age}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed mb-8 h-12 overflow-hidden">
                    {item.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {item.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl border-2 border-slate-100 font-bold text-sm text-slate-500 hover:bg-slate-50 transition-colors`}>
                    查看课程路线
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Competition Service --- */}
      <section id="game" className="py-20 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[3rem] p-12 shadow-inner border border-white">
             <div className="max-w-2xl">
                <h2 className="text-4xl font-bold mb-6">赛事导向，以赛促学</h2>
                <p className="text-slate-600 mb-10 text-lg">
                   我们不只教编码，更协助孩子参与权威赛事。完整的赛事辅导流程，让孩子的证书含金量更高，助力升学择校。
                </p>
                <div className="grid grid-cols-2 gap-6">
                   {GAME_SERVICES.map(service => (
                     <div key={service.name} className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                           {service.icon}
                        </div>
                        <span className="font-bold text-sm leading-tight">{service.name}</span>
                     </div>
                   ))}
                </div>
                <div className="mt-12 flex items-center gap-4">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200" />
                     ))}
                   </div>
                   <div className="text-sm">
                      <p className="font-bold">2024届省级赛获奖率达 92%</p>
                      <p className="text-slate-500">累计获得奖项 120 余次</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
        <div className="absolute top-[-10%] right-[-10%] opacity-5 pointer-events-none">
           <Trophy size={600} strokeWidth={1} className="rotate-12 text-indigo-500" />
        </div>
      </section>

      {/* --- Promo: Wednesday No-Homework Day --- */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col md:flex-row items-center gap-12 text-white">
              <div className="flex-1">
                 <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/20 rounded-full text-sm font-bold mb-6 backdrop-blur-md">
                    <Calendar size={16} /> 周三周课特辑
                 </div>
                 <h2 className="text-4xl font-black mb-4">“周三无作业日” 编程嘉年华</h2>
                 <p className="text-xl text-orange-50 text-opacity-90 leading-relaxed mb-8">
                   每周三 18:40 - 20:00，宜良县校区开放式公益课巡演。<br/>
                   无人机实飞体验、Scratch创意工作坊，带上你的奇思妙想，我们在这里等你！
                 </p>
                 <div className="flex gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                       <p className="text-2xl font-bold">0元</p>
                       <p className="text-xs text-orange-200">全线免费体验</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                       <p className="text-2xl font-bold">1课时</p>
                       <p className="text-xs text-orange-200">深度技能解锁</p>
                    </div>
                 </div>
                 
                 {/* Poster Image Integration */}
                 <div className="mt-10 rounded-3xl overflow-hidden border-4 border-white/20 shadow-xl group">
                    <img 
                      src="/poster.jpg" 
                      alt="宣传海报" 
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                 </div>
              </div>
              <div className="w-full md:w-96 bg-white rounded-[2rem] p-8 shadow-2xl skew-y-1">
                 <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
                   <Phone className="text-orange-500" /> 抢先锁定试听名额
                 </h4>
                 <div className="space-y-4">
                    <input type="text" placeholder="孩子姓名" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-orange-500 transition-all text-slate-800" />
                    <input type="tel" placeholder="家长手机号" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-orange-500 transition-all text-slate-800" />
                    <button className="w-full py-4 bg-orange-600 text-white rounded-xl font-black text-lg shadow-lg hover:bg-orange-700 active:scale-95 transition-all">
                      立即申请 0元领课
                    </button>
                    <p className="text-center text-[10px] text-slate-400">仅限前10名登记家长，报名即送编程启蒙包一份</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- Teacher Section --- */}
      <section id="teachers" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-4xl font-bold mb-4">懂编程，更懂孩子的老师</h2>
           <p className="text-slate-500 mb-16 italic">教育的本质是一棵树摇动另一棵树</p>
           
           <div className="grid md:grid-cols-4 gap-8">
              {[
                { name: '皮老师', role: '教委会负责人', skill: 'Python/无人机专家', desc: '10年教研经验，擅长物理编程融合教学' },
                { name: '王老师', role: '竞赛组组长', skill: 'C++/信奥教练', desc: '曾指导多名学员获得CSP省一等奖' },
                { name: '陈老师', role: '图形化教研员', skill: '儿童心理学专家', desc: '极具亲和力，专注6-9岁编程逻辑启蒙' },
                { name: '李老师', role: '硬件高级讲师', skill: '单片机开发背景', desc: '从物理结构到代码运行，全链路大拿' }
              ].map(t => (
                <div key={t.name} className="group cursor-pointer">
                   <div className="relative mb-6 overflow-hidden rounded-[2.5rem]">
                      <div className="aspect-[4/5] bg-slate-200"></div>
                      <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-all"></div>
                   </div>
                   <h4 className="text-xl font-bold">{t.name}</h4>
                   <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mb-3 mt-1 underline underline-offset-4 decoration-2">{t.role}</p>
                   <p className="text-slate-400 text-sm">{t.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer id="booking" className="bg-slate-900 pt-20 pb-10 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-16 mb-20">
           <div>
              <div className="flex items-center gap-3 mb-8">
                <Logo className="w-12 h-12" />
                <h2 className="text-xl font-black tracking-tight">臻成青少编程</h2>
              </div>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                宜良县家长信赖的编程品牌。我们致力于通过高品质的编程课程，激发孩子的潜力，培养应对未来的能力。
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                    <MessageCircle size={20} />
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                    <Phone size={20} />
                 </div>
              </div>
           </div>
           
           <div>
              <h4 className="font-bold text-lg mb-8 border-l-4 border-indigo-500 pl-4">联系我们</h4>
              <ul className="space-y-6 text-sm">
                 <li className="flex items-start gap-4">
                    <MapPin className="text-indigo-500 shrink-0 mt-1" />
                    <div>
                       <p className="font-bold mb-1 underline underline-offset-2">宜良校区</p>
                       <p className="text-slate-400">宜良县匡远街道办事处金房向阳里8-1商铺</p>
                    </div>
                 </li>
                 <li className="flex items-center gap-4">
                    <Phone className="text-indigo-500 shrink-0" />
                    <div>
                       <p className="font-bold mb-1">皮老师热线</p>
                       <p className="text-slate-400">18208872739</p>
                    </div>
                 </li>
                 <li className="flex items-center gap-4">
                    <Calendar className="text-indigo-500 shrink-0" />
                    <div>
                       <p className="font-bold mb-1">咨询时间</p>
                       <p className="text-slate-400">09:00 - 21:00 (全年无休)</p>
                    </div>
                 </li>
              </ul>
           </div>
           
           <div className="bg-indigo-600 p-8 rounded-3xl relative overflow-hidden">
              <h4 className="font-bold text-lg mb-4">扫码领福利</h4>
              <p className="text-indigo-100 text-xs mb-8">添加教务中心老师微信，<br/>领取价值 299 元编程体验课。</p>
              <div className="w-32 h-32 bg-white rounded-2xl mx-auto shadow-xl flex items-center justify-center text-slate-900 border-4 border-indigo-400/30">
                 <div className="text-[10px] font-bold text-center">这里放二维码<br/>(Placeholder)</div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Rocket size={100} />
              </div>
           </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
           <p>© 2026 臻成青少编程培训中心. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-8">
              <span>隐私条款</span>
              <span>招贤纳士</span>
              <span>合作办学</span>
           </div>
        </div>
      </footer>

      {/* --- Sticky CTA for Mobile --- */}
      <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
         <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
           <Phone size={20} /> 咨询皮老师领优惠
         </button>
      </div>
    </div>
  );
}
