/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layout,
  CheckCircle2,
  Search,
  PenTool,
  Code2,
  ShieldCheck,
  AlertCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Target,
  Clock
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Slide {
  id: number;
  type: 'cover' | 'toc' | 'section' | 'content' | 'summary' | 'chart';
  title: string;
  subtitle?: string;
  content?: string[];
  items?: { title: string; desc: string; icon?: React.ReactNode }[];
  footer?: string;
  badge?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Bluevent GEO 수행계획',
    subtitle: 'AI 기반 검색 엔진 최적화 및 사용자 경험 고도화 전략',
    footer: '2026. 02. 24',
    badge: 'v2.1'
  },
  {
    id: 2,
    type: 'toc',
    title: 'Table of Contents',
    items: [
      { title: '01. 현황 및 목표', desc: 'GEO 성과 지표 및 분석 진단' },
      { title: '02. 설계', desc: 'GEO 기반 정보 구조 및 메시지 전략' },
      { title: '03. 구현', desc: '콘텐츠 등록 및 구조화 데이터 적용' },
      { title: '04. 테스트 및 검증', desc: 'QA 및 운영 안정화' },
      { title: '05. 필요사항', desc: '프로젝트 수행을 위한 필수 리소스' }
    ]
  },
  {
    id: 3,
    type: 'chart',
    title: 'GEO 성과 지표 (예시)',
    subtitle: 'SEO 대비 GEO 전환 시 기대 노출 상승률',
    items: [
      { title: 'ChatGPT', desc: '45%' },
      { title: 'Perplexity', desc: '62%' },
      { title: 'Claude', desc: '38%' },
      { title: 'Gemini', desc: '51%' }
    ]
  },
  {
    id: 4,
    type: 'section',
    title: '01. 분석 및 진단',
    subtitle: 'Analysis & Diagnosis'
  },
  {
    id: 5,
    type: 'content',
    title: '1단계: 분석 및 진단',
    items: [
      {
        title: '1-1. 현황 진단',
        desc: '주요 AI 플랫폼(ChatGPT, Perplexity 등) 기반 핵심 토픽(음식물 처리기 등) 언급 여부 및 감성 분석',
        icon: <Search className="w-5 h-5" />
      },
      {
        title: '1-2. 경쟁사 분석',
        desc: '경쟁사 AI 점유율(SOV) 비교 진단 및 주요 프롬프트(20~30개)별 응답 데이터 시각화 [1W]',
        icon: <Layout className="w-5 h-5" />
      },
      {
        title: '1-3. 인텐트 마이닝',
        desc: '고객 자연어 질문(추천/정의/비교 등) 수집 및 페르소나별 FAQ 소스/키워드 도출 [0.5W]',
        icon: <AlertCircle className="w-5 h-5" />
      }
    ]
  },
  {
    id: 6,
    type: 'section',
    title: '02. 설계',
    subtitle: 'Design'
  },
  {
    id: 7,
    type: 'content',
    title: '2단계: 설계',
    items: [
      {
        title: '2-1. GEO 기반 IA 재정의',
        desc: '고객 인텐트(Intent) 상황별 신규 메뉴(가이드/케이스 등) 기획 및 Topic Map 기반 IA 재구성',
        icon: <Layout className="w-5 h-5" />
      },
      {
        title: '2-2. 메시지 하우스 전략',
        desc: '브랜드 일관성 확보 및 사람/AI 모두를 만족시키는 이중 글쓰기 템플릿 설계 [1W]',
        icon: <PenTool className="w-5 h-5" />
      },
      {
        title: '2-3. 테크니컬 요구사항',
        desc: '고도몰 치환코드 기반 스키마 마크업, llms.txt, 이미지 Alt 등 멀티모달 최적화 기준 설계',
        icon: <Code2 className="w-5 h-5" />
      }
    ]
  },
  {
    id: 8,
    type: 'section',
    title: '03. 구현',
    subtitle: 'Implementation'
  },
  {
    id: 9,
    type: 'content',
    title: '3단계: 구현',
    items: [
      {
        title: '3-1. 상세페이지/콘텐츠 등록',
        desc: '설계 기반 템플릿 수정, FAQ/HowTo 블록 삽입 및 HTML 코딩/슬라이싱 적용',
        icon: <PenTool className="w-5 h-5" />
      },
      {
        title: '3-2. 구조화 데이터 적용',
        desc: '고도몰 SSR/URL 정규화 한계 극복을 위한 HTML 내 직접 Schema 및 Canonical 태그 적용 [1W]',
        icon: <Code2 className="w-5 h-5" />
      }
    ]
  },
  {
    id: 10,
    type: 'section',
    title: '04. 테스트 및 검증',
    subtitle: 'Testing & Validation'
  },
  {
    id: 11,
    type: 'content',
    title: '4단계: 테스트 및 검증',
    items: [
      {
        title: '4-1. QA 및 테크니컬 체크',
        desc: 'AI 가독성/요약 일치도 테스트 및 Schema 오류, H1/H2 태그 순서 정합성 검증',
        icon: <ShieldCheck className="w-5 h-5" />
      },
      {
        title: '4-2. 모니터링 시스템 구축',
        desc: 'Google Sheets + Claude API 연동 기반 AI 언급률/순위 대시보드 세팅 및 리포팅',
        icon: <Search className="w-5 h-5" />
      },
      {
        title: '4-3. 초기 운영 안정화',
        desc: '리포트 분석 기반 PDCA 사이클 운영 및 초기 데이터 기반 전략 수정 [1.5W~2W]',
        icon: <CheckCircle2 className="w-5 h-5" />
      }
    ]
  },
  {
    id: 12,
    type: 'content',
    title: '필요사항',
    items: [
      {
        title: '시스템 권한',
        desc: '고도몰 계정 및 편집 접근 권한 확보',
        icon: <ShieldCheck className="w-5 h-5" />
      },
      {
        title: '원본 데이터',
        desc: '제품 스펙표, 매뉴얼 PDF, FAQ 원문 등 Raw Data 제공',
        icon: <AlertCircle className="w-5 h-5" />
      },
      {
        title: '디자인 리소스',
        desc: '상세페이지 리디자인을 위한 Figma/PSD 소스',
        icon: <PenTool className="w-5 h-5" />
      }
    ]
  },
  {
    id: 13,
    type: 'summary',
    title: 'Summary',
    content: [
      'AI 플랫폼 내 브랜드 가시성 확보를 위한 GEO 최적화',
      '사용자 인텐트 기반의 정보 구조(IA) 및 콘텐츠 재설계',
      '구조화 데이터 적용을 통한 검색 엔진 신뢰도 향상',
      '지속적인 모니터링을 통한 데이터 기반의 성과 최적화'
    ]
  }
];


export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-blue-100 selection:text-blue-700 overflow-hidden flex flex-col">
      {/* Top Header / Progress Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="flex items-center justify-between px-6 h-14">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Bluevent <span className="text-blue-600">GEO</span></span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">V2.1</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    idx === currentSlide ? "w-6 bg-blue-600" : "w-1.5 bg-slate-200"
                  )}
                />
              ))}
            </div>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-72 border-r border-slate-200/60 bg-white/50 backdrop-blur-md overflow-y-auto hidden lg:flex flex-col pt-20 pb-24">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-2 mb-8 px-2">
              <Layout className="w-4 h-4 text-blue-600" />
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Documentation Index</h3>
            </div>
            <nav className="space-y-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-2xl transition-all flex items-start space-x-4 group relative",
                    currentSlide === idx
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  )}
                >
                  {currentSlide === idx && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-white rounded-full my-auto inset-y-0 -ml-0.5"
                    />
                  )}
                  <span className={cn(
                    "font-mono text-xs font-bold mt-0.5 shrink-0",
                    currentSlide === idx ? "text-blue-100" : "text-slate-300 group-hover:text-blue-400"
                  )}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col overflow-hidden">
                    <span className={cn(
                      "text-sm leading-tight truncate",
                      (s.type === 'section' || idx <= 1) ? "font-bold" : "font-medium",
                      (s.type === 'section' && currentSlide !== idx) ? "text-blue-600" : ""
                    )}>
                      {s.title}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Slide Area */}
        <main className="flex-1 relative flex items-center justify-center p-4 md:p-12 lg:p-16 pt-20 md:pt-28 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-6xl aspect-[16/10] bg-white border border-slate-200/60 rounded-[32px] shadow-xl shadow-slate-200/50 overflow-hidden relative flex flex-col"
            >
              {/* Slide Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

              {/* Slide Content */}
              <div className="flex-1 relative z-10 flex flex-col p-10 md:p-20">
                {slide.type === 'cover' && (
                  <div className="flex-1 flex flex-col justify-center items-center text-center space-y-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                        <Target className="w-3.5 h-3.5" />
                        <span>Project Execution Plan</span>
                      </div>
                      <h1 className="text-5xl md:text-7xl font-heavy font-black tracking-tight text-slate-900 leading-[1.1]">
                        {slide.title}
                      </h1>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl leading-relaxed"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="pt-8"
                    >
                      <button
                        onClick={nextSlide}
                        className="group flex items-center space-x-3 px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-200"
                      >
                        <span>시작하기</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  </div>
                )}

                {slide.type === 'toc' && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-12">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                        {slide.title}
                      </h2>
                      <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {slide.items?.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx + 0.2 }}
                          className="group relative flex items-start space-x-5 p-6 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                          onClick={() => {
                            const target = slides.findIndex(s => s.title.includes(item.title.split('. ')[1]));
                            if (target !== -1) setCurrentSlide(target);
                          }}
                        >
                          <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 font-bold font-mono transition-colors shrink-0">
                            {item.title.split('. ')[0]}
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {item.title.split('. ')[1]}
                            </h3>
                            <p className="text-slate-500 font-medium">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {slide.type === 'chart' && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-12">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                      <p className="text-lg text-slate-500 font-medium mt-2">{slide.subtitle}</p>
                    </div>

                    <div className="flex-1 flex items-end justify-around gap-4 pb-8">
                      {slide.items?.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1 max-w-[120px]">
                          <div className="relative w-full bg-slate-50 rounded-2xl p-2 flex flex-col items-center group">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${parseInt(item.desc || '0') * 3}px` }}
                              transition={{ delay: 0.2 + idx * 0.1, duration: 1, ease: "easeOut" }}
                              className="w-full bg-blue-600 rounded-xl shadow-lg shadow-blue-100 relative overflow-hidden"
                            >
                              <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"
                              />
                            </motion.div>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1 + idx * 0.1 }}
                              className="mt-4 text-2xl font-black text-blue-600"
                            >
                              {item.desc}
                            </motion.span>
                          </div>
                          <span className="mt-6 text-sm font-bold text-slate-400 uppercase tracking-wider">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {slide.type === 'section' && (
                  <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-4 rounded-3xl bg-blue-50 text-blue-600"
                    >
                      <TrendingUp className="w-12 h-12" />
                    </motion.div>
                    <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">{slide.title}</h1>
                    <p className="text-2xl text-blue-600 font-bold uppercase tracking-[0.2em]">{slide.subtitle}</p>
                  </div>
                )}

                {slide.type === 'content' && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-end mb-12 px-2">
                      <div className="space-y-1">
                        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">
                          {slide.id === 12 ? 'Pre-requisites' : `Phase ${slide.id === 5 ? '1' : slide.id === 7 ? '2' : slide.id === 9 ? '3' : '4'}`}
                        </span>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                      </div>
                    </div>

                    {/* Notice banner moved under title for Slide 12 */}
                    {slide.id === 12 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="mb-10 relative group inline-block"
                      >
                        <div className="absolute inset-0 bg-blue-600/10 blur-xl group-hover:bg-blue-600/20 transition-colors duration-500" />
                        <div className="relative flex items-center space-x-4 px-6 py-3 bg-blue-50/50 backdrop-blur-xl border border-blue-100/50 rounded-2xl">
                          <div className="relative w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
                            <AlertCircle className="w-5 h-5" />
                          </div>
                          <p className="font-bold text-base text-slate-700">
                            원활한 프로젝트 수행을 위해 <span className="text-blue-600 font-black">아래 항목 접근 권한 및 자료 준비</span> 필요
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Layout Variant 1: Grid (for Phase 1, 2, 4) */}
                    {(slide.id === 5 || slide.id === 7 || slide.id === 11) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {slide.items?.map((item, idx) => {
                          const durationMatch = item.desc?.match(/\[(.*?)\]/);
                          const cleanDesc = item.desc?.replace(/\[(.*?)\]/, '').trim();

                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * idx + 0.3 }}
                              className="group flex flex-col p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500"
                            >
                              <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                  {item.icon}
                                </div>
                                {durationMatch && (
                                  <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100/50 text-[10px] font-black uppercase tracking-wider">
                                    <Clock className="w-3 h-3" />
                                    <span>{durationMatch[1]}</span>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-3">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{cleanDesc}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}

                    {/* Layout Variant 2: Split / Featured (for Phase 3) */}
                    {slide.id === 9 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-center">
                        {slide.items?.map((item, idx) => {
                          const durationMatch = item.desc?.match(/\[(.*?)\]/);
                          const cleanDesc = item.desc?.replace(/\[(.*?)\]/, '').trim();

                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * idx + 0.3 }}
                              className="flex flex-col p-10 rounded-[40px] bg-gradient-to-br from-white to-slate-50 border border-slate-100 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 relative overflow-hidden group"
                            >
                              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-[100px] group-hover:bg-blue-600/10 transition-colors" />
                              <div className="flex justify-between items-start mb-8 transition-transform group-hover:-translate-y-1 duration-500">
                                <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                  {item.icon}
                                </div>
                                {durationMatch && (
                                  <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur shadow-sm border border-slate-100 text-blue-600 text-xs font-black uppercase tracking-widest">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{durationMatch[1]}</span>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-4">
                                <h3 className="text-3xl font-black text-slate-900">{item.title}</h3>
                                <p className="text-xl text-slate-500 font-medium leading-relaxed">{cleanDesc}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}

                    {/* Layout Variant 3: Specialized Resource Board (for Slide 12) */}
                    {slide.id === 12 && (
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {slide.items?.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + idx * 0.1, type: "spring", stiffness: 100 }}
                              className="relative flex flex-col bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200 border border-slate-100 group hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                            >
                              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="w-24 h-24 mx-auto mb-8 rounded-[32px] bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-blue-600 group-hover:text-blue-700 transition-colors duration-500">
                                <div className="scale-[1.8] group-hover:rotate-12 transition-transform duration-500">
                                  {item.icon}
                                </div>
                              </div>
                              <div className="text-center space-y-4">
                                <h3 className="text-2xl font-heavy font-black text-slate-900">{item.title}</h3>
                                <div className="h-1 w-12 bg-blue-100 mx-auto rounded-full group-hover:w-20 group-hover:bg-blue-600 transition-all duration-500" />
                                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {slide.type === 'summary' && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-16">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                      <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center max-w-4xl space-y-6">
                      {slide.content?.map((text, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx + 0.2 }}
                          className="flex items-center space-x-6 p-6 rounded-3xl bg-slate-50 border border-slate-100"
                        >
                          <div className="w-4 h-4 rounded-full bg-blue-600 shrink-0 shadow-lg shadow-blue-200" />
                          <p className="text-2xl font-bold text-slate-700">{text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Slide Footer */}
                <footer className="mt-auto pt-8 flex justify-between items-center text-slate-400 font-bold border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs uppercase tracking-widest leading-none">{slide.footer || 'Bluevent GEO Project'}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-1">
                      <span className="text-blue-600">{currentSlide + 1}</span>
                      <span>/</span>
                      <span>{slides.length}</span>
                    </div>
                  </div>
                </footer>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Controls */}
      <div className="fixed bottom-8 left-1/2 md:left-auto md:right-8 -translate-x-1/2 md:translate-x-0 z-50 flex items-center space-x-2 p-2 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-200/50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-xl hover:bg-slate-100 disabled:opacity-20 transition-all active:scale-90"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </button>

        <div className="px-4 border-l border-r border-slate-100 font-mono text-sm font-bold text-slate-400">
          {String(currentSlide + 1).padStart(2, '0')}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 rounded-xl hover:bg-slate-100 disabled:opacity-20 transition-all active:scale-90"
        >
          <ChevronRight className="w-6 h-6 text-slate-700" />
        </button>
      </div>
    </div>
  );
}

