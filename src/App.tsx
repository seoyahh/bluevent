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
  Check,
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
  type: 'cover' | 'toc' | 'section' | 'content' | 'summary' | 'chart' | 'roadmap' | 'calendar' | 'detail' | 'poc_roadmap';
  title: string;
  subtitle?: string;
  content?: string[];
  items?: { title: string; desc: string; icon?: React.ReactNode; subItems?: string[] }[];
  groups?: {
    deliverable?: { text: string; duration: string };
    items: { title: string; desc: string }[];
  }[];
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
    type: 'poc_roadmap',
    title: '단계별 POC 로드맵',
    subtitle: '5주간의 고강도 GEO 최적화 및 기술 구현 타임라인',
    items: [
      {
        title: '1단계: 분석 및 진단',
        desc: '1.5W',
        subItems: ['현황 진단', '경쟁사 분석', '인텐트 마이닝']
      },
      {
        title: '2단계: 설계',
        desc: '1W',
        subItems: ['GEO 기반 IA 재정의', '메시지 하우스 및 페이지 구조화 전략 수립', '테크니컬 요구사항 정의']
      },
      {
        title: '3단계: 구현',
        desc: '1W',
        subItems: ['제품 상세페이지 및 신규 콘텐츠 페이지 등록', '구조화 데이터 및 메타태그 적용']
      },
      {
        title: '4단계: 테스트 및 검증',
        desc: '1.5W',
        subItems: ['QA 진행', '모니터링 시스템 구축', '초기 운영 안정화']
      }
    ]
  },
  {
    id: 3,
    type: 'detail',
    title: '1단계: 분석 및 진단 (Analysis & Diagnosis)',
    subtitle: 'As-is 현황 및 타겟 고객 의도 분석',
    groups: [
      {
        items: [
          {
            title: '1-1. 현황 진단',
            desc: '주요 AI 플랫폼(ChatGPT, Perplexity 등) 기반 브랜드 언급률, 순위 점유율 및 감성(Sentiment) 정밀 진단'
          },
          {
            title: '1-2. 경쟁사 분석',
            desc: '경쟁사 대비 AI SOV(Share of Voice) 비교 분석 및 벤치마킹을 통한 핵심 개선 기회(Opportunity) 도출'
          }
        ],
        deliverable: {
          duration: '1W',
          text: '주요 프롬프트별 응답 데이터 수집 및 SOV 시각화 리포트 도출'
        }
      },
      {
        items: [
          {
            title: '1-3. 인텐트 마이닝',
            desc: '고객 검색 의도(추천/비교/해결) 기반 자연어 질문 수집 및 토픽 우선순위 타겟팅'
          }
        ],
        deliverable: {
          duration: '0.5W',
          text: '고객 페르소나별 최적화 질문 리스트(FAQ 소스) 도출'
        }
      }
    ]
  },
  {
    id: 4,
    type: 'detail',
    title: '2단계: 설계 (Design)',
    subtitle: 'AI가 블루벤트를 올바르고 일관되게 학습할 수 있도록 정보 구조와 콘텐츠 전략을 기획합니다.',
    groups: [
      {
        items: [
          {
            title: '2-1. GEO 기반 IA(정보 구조) 재정의',
            desc: '고객 인텐트별 신규 메뉴(솔루션/가이드/사례) 기획 및 GEO Topic Map 기반 IA 재구성'
          },
          {
            title: '2-2. 메시지 하우스 및 페이지 구조화 전략 수립',
            desc: '브랜드 정의 고도화 및 사람·AI 모두를 만족시키는 전용 "이중 글쓰기" 템플릿 설계'
          }
        ],
        deliverable: {
          duration: '1W',
          text: '템플릿 제작 및 페이지 구조화를 위한 와이어프레임 도출'
        }
      },
      {
        items: [
          {
            title: '2-3. 테크니컬 요구사항 정의',
            desc: '스키마 마크업(JSON-LD), llms.txt 구성 및 멀티모달(Alt-tag) 최적화 기술 가이드 수립'
          }
        ],
        deliverable: {
          duration: '퍼블공수 확인필요',
          text: '고도몰 치환코드 활용 및 데이터 매핑 최적화'
        }
      }
    ]
  },
  {
    id: 5,
    type: 'detail',
    title: '3단계: 구현 (Implementation)',
    subtitle: '설계된 전략을 바탕으로 실제 고도몰 솔루션 내에 템플릿과 콘텐츠를 제작하고 기술적 요소를 반영합니다.',
    groups: [
      {
        items: [
          {
            title: '3-1. 제품 상세페이지 및 신규 콘텐츠 페이지 등록',
            desc: '인텐트 대응형 FAQ/HowTo 블록 삽입 및 고도몰 템플릿 최적화 구현'
          },
          {
            title: '3-2. 구조화 데이터 및 메타태그 적용',
            desc: 'JSON-LD 스키마 삽입, SSR 환경 한계 극복을 위한 직접 텍스트 삽입 및 Canonical 가이드 적용'
          }
        ],
        deliverable: {
          duration: '1W',
          text: 'HTML 기반 최적화 템플릿 실제 상품 및 콘텐츠 적용 완료'
        }
      }
    ]
  },
  {
    id: 6,
    type: 'detail',
    title: '4단계: 테스트 및 검증 (Testing & Validation)',
    subtitle: '구현된 웹사이트가 오류 없이 작동하는지 확인하고, AI 검색 엔진에서의 노출 효과를 측정하여 안정화 합니다.',
    groups: [
      {
        items: [
          {
            title: '4-1. QA 진행',
            desc: '내부 톤앤매너 검수, AI 가독성(요약 일치도) 테스트 및 테크니컬 SEO 정밀 기술 검증'
          },
          {
            title: '4-2. 모니터링 시스템 구축',
            desc: '언급률/순위/SOV 추적 대시보드(Google Sheets + Claude API 연동) 세팅'
          },
          {
            title: '4-3. 초기 운영 안정화',
            desc: '성과 리포트 기반 콘텐츠 개선 및 전략 수정의 정기적 PDCA(Plan-Do-Check-Act) 사이클 가동'
          }
        ],
        deliverable: {
          duration: '초기 운영 포함 1.5W~2W',
          text: '성과 모니터링 및 전략 최적화 리포트 정기 도출'
        }
      }
    ]
  }
];


export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveSlide(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.slide-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-screen bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-blue-100 selection:text-blue-700 overflow-y-auto snap-y snap-mandatory scroll-smooth flex flex-col items-center">
      <div className="w-full flex flex-col items-center space-y-[40vh]">
        {slides.map((slide, index) => (
          <section
            key={slide.id}
            data-index={index}
            className="slide-section flex-shrink-0 h-screen w-full snap-start snap-always flex items-center justify-center p-6 md:py-24 md:px-16 overflow-hidden"
          >
            <div className="w-full max-w-[1600px] h-full relative flex flex-col justify-center">
              <div className="relative z-10 flex flex-col p-10 md:py-16 md:px-20 bg-white/40 rounded-[40px] backdrop-blur-sm border border-white/20">
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
                      <h1 className="text-4xl md:text-6xl font-heavy font-black tracking-tight text-slate-900 leading-[1.1]">
                        {slide.title}
                      </h1>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl text-slate-500 font-medium max-w-3xl leading-relaxed"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <div className="pt-8">
                      <div className="text-slate-400 font-bold text-sm flex items-center space-x-2 animate-bounce">
                        <span>스크롤하여 탐색하기</span>
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
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
                            const targetIndex = slides.findIndex(s => s.title.includes(item.title.split('. ')[1]));
                            if (targetIndex !== -1) {
                              document.querySelector(`[data-index="${targetIndex}"]`)?.scrollIntoView({ behavior: 'smooth' });
                            }
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
                          {slide.id === 10 ? 'Pre-requisites' : `Phase ${slide.id === 3 ? '1' : slide.id === 5 ? '2' : slide.id === 7 ? '3' : '4'}`}
                        </span>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                      </div>
                    </div>

                    {/* Notice banner moved under title for Slide 10 */}
                    {slide.id === 10 && (
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
                    {(slide.id === 3 || slide.id === 5 || slide.id === 9) && (
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
                    {slide.id === 7 && (
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

                    {/* Layout Variant 3: Specialized Resource Board (for Slide 10) */}
                    {slide.id === 10 && (
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

                {slide.type === 'roadmap' && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-16">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                      <p className="text-lg text-slate-500 font-medium mt-2">{slide.subtitle}</p>
                    </div>
                    <div className="flex-1 relative flex items-center">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-6 w-full relative z-10">
                        {slide.items?.map((item, idx) => {
                          const durationMatch = item.desc?.match(/\[(.*?)\]/);
                          const cleanDesc = item.desc?.replace(/\[(.*?)\]/, '').trim();
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: idx % 2 === 0 ? -30 : 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 * idx + 0.5, type: "spring" }}
                              className="flex flex-col items-center text-center"
                            >
                              {idx % 2 === 0 && (
                                <div className="mb-8 p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 group hover:-translate-y-2 transition-transform duration-500">
                                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                                    {item.icon}
                                  </div>
                                  <h3 className="text-lg font-black text-slate-900 mb-2 truncate">{item.title}</h3>
                                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">{cleanDesc}</p>
                                  {durationMatch && (
                                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-black text-[9px] uppercase">
                                      <Clock className="w-3 h-3" />
                                      <span>{durationMatch[1]}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="w-5 h-5 rounded-full bg-white border-4 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] relative">
                                <motion.div
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                  className="absolute inset-0 rounded-full bg-blue-600/20"
                                />
                              </div>
                              {idx % 2 !== 0 && (
                                <div className="mt-8 p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 group hover:translate-y-2 transition-transform duration-500">
                                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                                    {item.icon}
                                  </div>
                                  <h3 className="text-lg font-black text-slate-900 mb-2 truncate">{item.title}</h3>
                                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">{cleanDesc}</p>
                                  {durationMatch && (
                                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-black text-[9px] uppercase">
                                      <Clock className="w-3 h-3" />
                                      <span>{durationMatch[1]}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {slide.type === 'poc_roadmap' && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-6">
                      <h2 className="text-5xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                      <p className="text-xl text-slate-500 font-medium mt-2">{slide.subtitle}</p>
                    </div>

                    {/* Horizontal Weekly Timeline section */}
                    <div className="flex-1 py-8 px-10 bg-white/40 border border-white rounded-[40px] shadow-sm relative overflow-hidden backdrop-blur-sm flex flex-col">
                      <div className="grid grid-cols-5 mb-4 px-2 text-[10px] font-black tracking-[0.4em] text-slate-300">
                        {[1, 2, 3, 4, 5].map(w => (
                          <div key={w} className="text-center">WEEK 0{w}</div>
                        ))}
                      </div>

                      <div className="relative flex-1 grid grid-cols-5 gap-0 border-t border-slate-100/50 pt-5">
                        {/* Vertical Grid Lines */}
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="absolute top-0 bottom-0 border-l border-slate-100/40" style={{ left: `${(i - 1) * 20}%` }} />
                        ))}
                        <div className="absolute top-0 bottom-0 right-0 border-r border-slate-100/40" />

                        {/* Phase Rows */}
                        <div className="col-span-5 flex flex-col space-y-4">
                          {slide.items?.map((item, idx) => {
                            const getStyle = (index: number) => {
                              switch (index) {
                                case 0: return { marginLeft: '0%', width: '30%', bgColor: 'bg-sky-400', shadow: '' };
                                case 1: return { marginLeft: '30%', width: '20%', bgColor: 'bg-blue-500', shadow: '' };
                                case 2: return { marginLeft: '50%', width: '20%', bgColor: 'bg-blue-700', shadow: '' };
                                case 3: return { marginLeft: '70%', width: '30%', bgColor: 'bg-indigo-900', shadow: '' };
                                default: return {};
                              }
                            };
                            const style = getStyle(idx);
                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                className="relative"
                              >
                                <div
                                  className={cn(
                                    "h-10 rounded-2xl flex items-center px-6 relative z-10 transition-all hover:translate-x-1",
                                    (style as any).bgColor
                                  )}
                                  style={{ marginLeft: (style as any).marginLeft, width: (style as any).width }}
                                >
                                  <span className="text-white font-black text-sm whitespace-nowrap">{item.title}</span>
                                  <span className="ml-auto text-[11px] font-black text-white/60 uppercase">{item.desc}</span>
                                </div>

                                <div
                                  className="mt-1.5 grid grid-cols-1 gap-0.5 pl-4"
                                  style={{ marginLeft: (style as any).marginLeft, width: (style as any).width }}
                                >
                                  {item.subItems?.map((sub, sidx) => (
                                    <div key={sidx} className="flex items-center space-x-2 group">
                                      <div className="w-1 h-1 rounded-full bg-slate-200 shrink-0 group-hover:scale-150 transition-transform" />
                                      <span className="text-[11px] font-bold text-slate-400 leading-tight group-hover:text-slate-600 transition-colors">{sub}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slide.type === 'calendar' && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-12">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                      <p className="text-lg text-slate-500 font-medium mt-2">{slide.subtitle}</p>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {slide.items?.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * idx + 0.3 }}
                          className="relative group p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-bl-[60px] group-hover:bg-blue-600 transition-colors duration-500" />
                          <div className="flex items-center space-x-4 mb-6 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                              {item.icon}
                            </div>
                            <span className="text-sm font-black text-blue-600 uppercase tracking-widest group-hover:text-white transition-colors">
                              {item.title}
                            </span>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                            {item.desc}
                          </h3>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {slide.type === 'detail' && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-14">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Detailed Plan</div>
                        <div className="h-px w-12 bg-slate-200" />
                      </div>
                      <h2 className="text-5xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                      <p className="text-xl text-slate-500 font-medium mt-2">{slide.subtitle}</p>
                    </div>

                    <div className={cn(
                      "grid gap-8 flex-1",
                      slide.groups?.length === 1 ? "grid-cols-1" :
                        slide.groups?.length === 2 ? "grid-cols-2" : "grid-cols-3"
                    )}>
                      {slide.groups?.map((group, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx + 0.2 }}
                          className="flex flex-col bg-white rounded-[48px] border border-slate-100 overflow-hidden group hover:-translate-y-2 transition-all duration-500"
                        >
                          {/* Card Header Area */}
                          <div className="p-10 pb-6 space-y-8 flex-1">
                            <div className="flex justify-between items-start">
                              <div className="w-16 h-16 rounded-[22px] bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                {idx === 0 ? <Search className="w-8 h-8" /> : idx === 1 ? <Target className="w-8 h-8" /> : <TrendingUp className="w-8 h-8" />}
                              </div>
                              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                                {index >= 2 ? `Phase 0${index - 1}` : `Slide 0${index}`}
                              </span>
                            </div>

                            <div className="space-y-6">
                              {group.items.map((item, iidx) => (
                                <div key={iidx} className="space-y-2">
                                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                                    {item.title}
                                  </h3>
                                  <p className="text-base font-medium text-slate-500 leading-relaxed">
                                    {item.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Deliverable/Output Section */}
                          {group.deliverable && (
                            <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-4">
                              <div className="flex items-center justify-end">
                                <div className="flex items-center space-x-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[9px] font-black">
                                  <Clock className="w-3 h-3" />
                                  <span>{group.deliverable.duration}</span>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                <p className="text-[15px] font-bold text-slate-600 leading-relaxed">
                                  {group.deliverable.text}
                                </p>
                              </div>
                            </div>
                          )}
                          {!group.deliverable && (
                            <div className="p-8 bg-slate-50 border-t border-slate-100" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {slide.type === 'summary' && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-12">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                      <p className="text-lg text-slate-500 font-medium mt-2">{slide.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1 items-center">
                      <div className="space-y-6">
                        {slide.content?.map((text, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx + 0.2 }}
                            className="flex items-center space-x-5 p-5 rounded-[24px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all"
                          >
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <p className="text-xl font-bold text-slate-700 leading-tight">{text}</p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div className="p-1 px-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full inline-block mb-2">Requirements</div>
                        <div className="grid grid-cols-1 gap-4">
                          {slide.items?.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + idx * 0.1 }}
                              className="flex items-center space-x-6 p-6 rounded-[32px] bg-white border border-slate-100 shadow-md hover:shadow-xl transition-shadow group"
                            >
                              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {item.icon}
                              </div>
                              <div className="space-y-1">
                                <h3 className="text-xl font-black text-slate-900 leading-none mb-1">{item.title}</h3>
                                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Minimal Page Number */}
      <div className="fixed bottom-10 right-14 z-50 pointer-events-none opacity-20">
        <span className="text-xs font-medium text-slate-500 tracking-widest">
          {activeSlide + 1}
        </span>
      </div>
    </div>
  );
}
