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
    title: 'Phase 1 단계별 POC 로드맵',
    items: [
      {
        title: '1단계: 현황 분석 및 진단',
        desc: '1W',
        subItems: ['AI 응답/인용 출처 수집', '사이트 구조·색인·정규화 점검', '설계 방안 리뷰(방향 검토/확정)']
      },
      {
        title: '2단계: 설계 및 구조화',
        desc: '0.5W',
        subItems: ['IA 기술 설계(토픽/엔티티)', '스키마/메타/정규화 설계']
      },
      {
        title: '3단계: 구현 및 적용',
        desc: '0.5W',
        subItems: ['HTML 구조/페이징 반영', '구조화 데이터 적용(코드)']
      },
      {
        title: '4단계: 테스트 및 검증',
        desc: '2W',
        subItems: ['기술적 무결성 QA', 'AI 인용/요약 일치도 검증']
      }
    ]
  },
  {
    id: 3,
    type: 'detail',
    title: '1단계: 현황 분석 및 진단',
    subtitle: 'GEO 관점에서 "AI가 읽고 이해하고 인용할 수 있는 구조"의 결함을 찾습니다.',
    groups: [
      {
        items: [
          {
            title: '1-1. 현황 진단',
            desc: '주요 AI 플랫폼(ChatGPT, Perplexity 등)에서 브랜드/제품군 질의 셋 기준 응답 수집(언급 유무, 근거 링크, 사실 오류 등) 및 인용 URL 추적을 통한 후보 랜딩 페이지 특정'
          }
        ],
        deliverable: {
          duration: '0.7W',
          text: '프롬프트 세트(20~30개) 정의 + 응답/근거 URL 로그 수집 + 진단 리포트'
        }
      },
      {
        items: [
          {
            title: '1-2. 테크니컬 GEO/SEO 점검',
            desc: '인덱싱 가능성(robots, sitemap, canonical) 및 사이트 구조(SSR 한계, 템플릿 반복 영역, 본문 비중, 헤딩 구조, 내부링크 품질) 정밀 점검'
          }
        ],
        deliverable: {
          duration: '0.3W',
          text: 'URL 정규화/색인 진단 체크리스트 + 개선 항목 목록(우선순위 포함)'
        }
      },
      {
        items: [
          {
            title: '1-3. 설계 방안 리뷰',
            desc: '진단 결과를 기반으로 설계 방향을 검토하고 확정'
          }
        ],
        deliverable: {
          duration: '연계',
          text: '확정된 설계 가이드라인 및 로드맵 보완'
        }
      }
    ]
  },
  {
    id: 4,
    type: 'detail',
    title: '2단계: 설계 및 구조화',
    subtitle: 'AI가 블루벤트를 일관되게 학습할 수 있도록 정보구조 및 화면 구조화 작업을 진행',
    groups: [
      {
        items: [
          {
            title: '2-1. GEO용 정보 구조(IA) 기술 설계',
            desc: '토픽/엔티티 단위로 페이지 타입을 정의하고(제품, 비교, FAQ 등), 각 페이지의 필수 섹션과 헤딩 규칙 표준화'
          }
        ],
        deliverable: {
          duration: '0.2W',
          text: '페이지 타입 정의서 + 헤딩/섹션 규칙 + 내부링크 규칙'
        }
      },
      {
        items: [
          {
            title: '2-2. 스키마/메타/정규화 적용 설계',
            desc: '페이지 타입별 JSON-LD 템플릿, 메타/OG, canonical 규칙 정의 및 고도몰 치환코드 기반 데이터 매핑(제품명, 모델, 스펙 등) 설계'
          }
        ],
        deliverable: {
          duration: '0.3W',
          text: 'JSON-LD 템플릿(페이지 타입별) + 치환코드/필드 매핑 상세 설계'
        }
      }
    ]
  },
  {
    id: 5,
    type: 'detail',
    title: '3단계: 구현 및 적용',
    subtitle: '신규 콘텐츠 제작이 아닌 템플릿/코드/데이터로 구조화 구현',
    groups: [
      {
        items: [
          {
            title: '3-1. 템플릿/HTML 구조 반영',
            desc: '헤딩/섹션 구조 표준을 템플릿에 반영하고, 본문에 최소한의 텍스트 구조(정의/스펙/FAQ 등)가 노출되도록 구성'
          },
          {
            title: '3-2. 구조화 데이터 및 메타태그 적용(코드 레벨)',
            desc: 'JSON-LD 삽입 및 메타/OG, canonical 적용. 고도몰의 SSR 한계를 고려하여 HTML 내 직접 텍스트/데이터를 삽입하는 방식으로 구현'
          }
        ],
        deliverable: {
          duration: '0.5W',
          text: '템플릿 1~2종 우선 적용 + 대표 상품/FAQ 페이지에 스키마 적용(파일럿)'
        }
      }
    ]
  },
  {
    id: 6,
    type: 'detail',
    title: '4단계: 테스트 및 검증',
    subtitle: '기술적 무결성과 재현 가능한 검증 절차를 우선하여 작업',
    groups: [
      {
        items: [
          {
            title: '4-1. 스키마/정규화/크롤링 QA',
            desc: '스키마 유효성, canonical/robots/sitemap 일관성, 중복 URL 발생 여부, 헤딩 구조, 본문 텍스트 노출 여부 점검'
          },
          {
            title: '4-2. AI 가독성/인용 검증(재현 가능한 테스트)',
            desc: '동일 프롬프트 세트로 전/후 비교 테스트를 수행하고, 근거 URL 인용 여부와 요약 일치도 확인'
          }
        ],
        deliverable: {
          duration: '2W',
          text: 'QA 체크리스트 + 전/후 비교 로그 + 이슈/수정 리스트'
        }
      }
    ]
  },
  {
    id: 7,
    type: 'summary',
    title: '확인 및 수급 필요 사항',
    subtitle: '원활한 POC 수행을 위한 사전 준비 항목',
    items: [
      {
        title: '접근 권한',
        desc: '고도몰 계정 및 접근 권한(템플릿/HTML 편집 권한 포함)',
        icon: <ShieldCheck className="w-6 h-6" />
      },
      {
        title: '제품 데이터 원본 (Raw Data)',
        desc: '스펙표(텍스트), 매뉴얼 PDF/텍스트, FAQ 원문, 모델/규격 표준명',
        icon: <BookOpen className="w-6 h-6" />
      },
      {
        title: 'URL 정책 / 운영 정책',
        desc: '리뉴얼/리다이렉트/카테고리 운영 규칙 (존재 시)',
        icon: <Target className="w-6 h-6" />
      },
      {
        title: '기존 자료',
        desc: '기존 템플릿 및 치환코드 목록 (가능 시)',
        icon: <Code2 className="w-6 h-6" />
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
                    <div className="mb-10">
                      <h2 className="text-5xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>

                    {/* Horizontal Weekly Timeline section */}
                    <div className="flex-1 py-12 px-10 bg-white/40 border border-white rounded-[40px] shadow-sm relative overflow-hidden backdrop-blur-sm flex flex-col justify-center">
                      <div className="grid grid-cols-4 mb-6 px-2 text-[12px] font-black tracking-[0.5em] text-slate-400">
                        {[1, 2, 3, 4].map(w => (
                          <div key={w} className="text-center relative">
                            WEEK 0{w}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-64 bg-slate-100" />
                          </div>
                        ))}
                      </div>

                      <div className="relative h-56 flex items-center">
                        {/* The horizontal track */}
                        <div className="absolute top-1/2 left-0 right-0 h-2 bg-slate-100 -translate-y-1/2 rounded-full" />

                        {/* Phase Grouping Lines - Positioned directly under the bars */}
                        <div className="absolute top-[136px] inset-x-0 flex pointer-events-none">
                          <div className="w-[50%] px-1 flex flex-col items-center">
                            <div className="w-full h-[3px] bg-sky-400 rounded-full" />
                          </div>
                          <div className="w-[50%] px-1 flex flex-col items-center">
                            <div className="w-full h-[3px] bg-indigo-900 rounded-full" />
                          </div>
                        </div>

                        <div className="flex w-full h-full items-start pt-20 relative z-10">
                          {slide.items?.map((item, idx) => {
                            const getWidth = (index: number) => {
                              switch (index) {
                                case 0: return '25%'; // 1W
                                case 1: return '12.5%'; // 0.5W
                                case 2: return '12.5%'; // 0.5W
                                case 3: return '50%'; // 2W
                                default: return '0%';
                              }
                            };
                            const getColors = (index: number) => {
                              switch (index) {
                                case 0: return 'bg-sky-400 shadow-sky-100';
                                case 1: return 'bg-blue-500 shadow-blue-100';
                                case 2: return 'bg-blue-600 shadow-blue-200';
                                case 3: return 'bg-indigo-900 shadow-indigo-200';
                                default: return '';
                              }
                            };

                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                style={{ width: getWidth(idx) }}
                                className="px-1"
                              >
                                <div className="group relative flex flex-col items-center">
                                  {/* Item Bar */}
                                  <div className={cn(
                                    "h-12 w-full rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:-translate-y-1 cursor-default relative",
                                    getColors(idx)
                                  )}>
                                    <span className="text-[11px] font-black text-white whitespace-nowrap overflow-hidden px-2 drop-shadow-sm">
                                      {item.title.split(': ')[1] || item.title}
                                    </span>

                                    {/* Duration Badge inside */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white border border-slate-100 rounded-lg text-[9px] font-black text-slate-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                      {item.desc}
                                    </div>
                                  </div>

                                  {/* Sub-items list below */}
                                  <div className="mt-12 flex flex-col items-center space-y-2 w-full">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mb-2" />
                                    {item.subItems?.map((sub, sidx) => (
                                      <div key={sidx} className="text-center">
                                        <span className="text-[10px] font-bold text-slate-400 leading-tight block hover:text-blue-600 transition-colors">
                                          {sub}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Work Scope Section (Minimalist List) */}
                    <div className="mt-6 pt-6 border-t border-slate-100/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-20">
                          <h3 className="text-xl font-black text-slate-900 tracking-tight shrink-0 uppercase">작업 범위</h3>
                          <div className="flex items-center space-x-8">
                            <div className="flex items-center space-x-3 group">
                              <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center transition-colors group-hover:bg-blue-600">
                                <Check className="w-3 h-3 text-blue-600 group-hover:text-white transition-colors" />
                              </div>
                              <span className="text-lg font-bold text-slate-600 group-hover:text-slate-900 transition-colors">IA 현행 유지</span>
                            </div>
                            <div className="w-px h-4 bg-slate-200" />
                            <div className="flex items-center space-x-3 group">
                              <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center transition-colors group-hover:bg-blue-600">
                                <Check className="w-3 h-3 text-blue-600 group-hover:text-white transition-colors" />
                              </div>
                              <span className="text-lg font-bold text-slate-600 group-hover:text-slate-900 transition-colors">제품 메인 페이지 대상 테크니컬 GEO 위주 변경</span>
                            </div>
                          </div>
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
                      <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">{slide.title}</h2>
                      <p className="text-xl text-slate-500 font-medium mt-6">{slide.subtitle}</p>
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
                            <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-4 min-h-[128px]">
                              {/* Duration badge removed */}
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
                    <div className="mb-10">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">{slide.title}</h2>
                      <p className="text-lg text-slate-500 font-medium mt-2">{slide.subtitle}</p>
                    </div>

                    <div className="flex-1 flex flex-col justify-start">
                      <div className="w-full space-y-4">
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
