import React from 'react';
import { motion } from 'framer-motion';
import './LandingPage.css';

export default function LandingPage({ onEnterChat }) {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="landing-container">
      <motion.nav
        className="landing-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="landing-logo">
          <svg width="28" height="28" fill="none" stroke="var(--accent)" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1S10 10 9 12z"></path>
            <path d="M12 9s3 .5 4 2c1.1 1.45 2 4 2 4S14.5 16 12 9z"></path>
          </svg>
          WYRA AI
        </div>
        <div className="landing-nav-links">
          <a href="#about">Tentang</a>
          <a href="#creator">Kreator</a>
          <a href="#challenges">Tantangan</a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="enter-chat-btn"
            onClick={onEnterChat}
          >
            Coba Sekarang
          </motion.button>
        </div>
      </motion.nav>

      <section className="landing-section hero-section" style={{ minHeight: 'auto', paddingTop: '8rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: 'white', border: '1px solid #e2e8f0', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '2rem' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
          NEXT-GEN SMARTDOCS AI
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', color: '#0f172a', fontWeight: '900', lineHeight: '1.05', letterSpacing: '-0.02em', background: 'none', WebkitTextFillColor: 'initial', textAlign: 'center' }}
        >
          Tanya Dokumen<br />dengan <span style={{ color: '#6366f1', background: 'none', WebkitTextFillColor: 'initial' }}>Cerdas</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '700px', margin: '2rem auto 3rem auto', lineHeight: '1.6', textAlign: 'center' }}
        >
          Satu-satunya sistem RAG lokal yang mampu memahami ribuan halaman laporan secara instan tanpa koneksi internet. Keamanan data Anda adalah prioritas utama kami.
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            className="enter-chat-btn"
            style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: '#6366f1', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)' }}
            onClick={onEnterChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
            Mulai Chat Sekarang
          </motion.button>

          <motion.a
            href="#about"
            style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'white', color: '#0f172a', borderRadius: '99px', textDecoration: 'none', fontWeight: '600', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
            whileHover={{ scale: 1.05, borderColor: '#cbd5e1' }}
            whileTap={{ scale: 0.95 }}
          >
            Pelajari Teknis
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </motion.a>
        </motion.div>

        <motion.div
          style={{ display: 'flex', gap: '2.5rem', marginTop: '4rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', flexWrap: 'wrap', justifyContent: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span>FASTAPI</span>
          <span>LLAMA 3.2</span>
          <span>OLLAMA</span>
          <span>REACT VITE</span>
        </motion.div>
      </section>

      <section
        id="about"
        className="landing-section"
        style={{ paddingTop: '2rem' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', color: '#0f172a', fontWeight: '800', marginBottom: '1rem' }}>
            Apa itu <span style={{ color: '#6366f1' }}>WYRA AI?</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Solusi cerdas untuk manajemen dokumen lokal yang mengutamakan privasi dan kecepatan akses informasi.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Top Row: 2 Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6.5 2a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem', fontWeight: '700' }}>100% Privat & Aman</h3>
              <p style={{ color: '#64748b', lineHeight: '1.7' }}>Data dokumen rahasia Anda tidak pernah meninggalkan perangkat. Diproses secara lokal dengan Llama 3.2 1B.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem', fontWeight: '700' }}>RAG Terintegrasi</h3>
              <p style={{ color: '#64748b', lineHeight: '1.7' }}>Mampu memahami konteks dokumen Anda secara mendalam dan memberikan jawaban berbasis fakta dokumen asli.</p>
            </motion.div>
          </div>

          {/* Bottom Row: 1 Wide Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '24px', padding: '3rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', boxShadow: '0 20px 40px -10px rgba(99,102,241,0.4)' }}
            whileHover={{ scale: 1.01 }}
          >
            <div style={{ flex: '1 1 450px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', opacity: 0.9 }}>PERFORMANCE</span>
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Backend Super Cepat & Efisien</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.7', fontSize: '1.05rem', maxWidth: '600px' }}>Dibangun dengan FastAPI Python untuk menjamin komunikasi asinkron yang mulus antara Antarmuka React (Vite) dengan Engine AI di backend.</p>
            </div>

            <motion.button
              onClick={onEnterChat}
              style={{ background: 'white', color: '#4f46e5', border: 'none', padding: '1.25rem 2.5rem', borderRadius: '99px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              whileHover={{ scale: 1.05, gap: '1rem' }}
              whileTap={{ scale: 0.95 }}
            >
              Coba Sekarang <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section
        id="creator"
        className="landing-section"
        style={{ padding: '6rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', maxWidth: '1000px', margin: '0 auto', alignItems: 'center' }}>
          
          {/* Left Side: Avatar/Image with Badges */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            {/* The main square block */}
            <div style={{ position: 'relative', width: '280px', height: '280px', backgroundColor: '#4b5563', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', zIndex: 2 }}>
              <span style={{ fontSize: '5rem', color: 'white', fontWeight: '300', letterSpacing: '-0.05em' }}>WA</span>
              
              {/* Badge 1: Code icon */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ position: 'absolute', top: '-15px', right: '-15px', width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 3 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </motion.div>
              
              {/* Badge 2: CPU icon */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                style={{ position: 'absolute', bottom: '20px', left: '-25px', width: '55px', height: '55px', backgroundColor: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 3 }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" /></svg>
              </motion.div>
            </div>
            
            {/* Background decorative blob */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#f3e8ff', borderRadius: '40px', transform: 'rotate(-5deg) scale(1.05)', zIndex: 1, opacity: 0.7 }}></div>
          </motion.div>

          {/* Right Side: Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '99px', marginBottom: '1.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              <span style={{ color: '#4f46e5', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.05em' }}>INFORMATIKA — SEMESTER 4</span>
            </div>

            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#0f172a', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Di Balik<br/>Layar<br/>
              <span style={{ color: '#6366f1' }}>WYRA</span>
            </h2>

            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1rem' }}>
              Saya <strong>Wahyu</strong>, pengembang perangkat lunak yang berdedikasi menciptakan pengalaman digital yang fungsional. Dengan dasar logika yang kuat, saya membangun Wyra AI sebagai wujud integrasi LLM ke dalam solusi nyata.
            </p>
            
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
              Teori bagi saya hanyalah langkah awal. Saya membuktikannya melalui proyek RAG (Retrieval-Augmented Generation) ini—fokus pada privasi data tanpa mengorbankan kecerdasan buatan.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.a 
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: '#0f172a', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Lihat Portofolio 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </motion.a>

              <motion.a 
                href="#"
                whileHover={{ scale: 1.1, backgroundColor: '#f8fafc' }}
                whileTap={{ scale: 0.9 }}
                style={{ width: '45px', height: '45px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </motion.a>

              <motion.a 
                href="#"
                whileHover={{ scale: 1.1, backgroundColor: '#f8fafc' }}
                whileTap={{ scale: 0.9 }}
                style={{ width: '45px', height: '45px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="challenges"
        className="landing-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeUpVariant} style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>
          Tinjauan Proyek (STAR Method)
        </motion.h2>

        {/* Situation & Task */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <motion.div className="feature-card" variants={fadeUpVariant} style={{ backgroundColor: '#fff1f2', borderColor: '#ffe4e6' }} whileHover={{ scale: 1.02 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fecdd3', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>
              </div>
              <h3 style={{ margin: 0, color: '#0f172a' }}>Masalah (Situation)</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.95rem' }}>Ketergantungan pada API cloud (seperti OpenAI) memunculkan risiko kebocoran data sensitif dari dokumen pengguna, ditambah dengan potensi biaya operasional (token) yang membengkak untuk analisis data skala besar.</p>
          </motion.div>

          <motion.div className="feature-card" variants={fadeUpVariant} style={{ backgroundColor: '#ecfdf5', borderColor: '#d1fae5' }} whileHover={{ scale: 1.02 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#a7f3d0', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 style={{ margin: 0, color: '#0f172a' }}>Solusi Saya (Task)</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.95rem' }}>Membangun ekosistem AI murni lokal menggunakan LangChain sebagai orkestrator, Llama 3.2 (via Ollama) sebagai LLM utama, ChromaDB untuk Vector Storage yang cepat, dan FastAPI untuk melayani request di backend.</p>
          </motion.div>
        </div>

        {/* Action */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <motion.div className="feature-card" variants={fadeUpVariant} style={{ backgroundColor: '#fffbeb', borderColor: '#fef3c7' }} whileHover={{ scale: 1.02 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fde68a', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 style={{ margin: 0, color: '#0f172a' }}>Tantangan Yang Saya Hadapi</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.95rem' }}>Tantangan terbesar adalah mengoptimalkan performa AI pada resource hardware yang sangat terbatas (CPU i3 / RAM 8GB), serta mengatasi konflik dependencies Python yang ketat di sistem operasi Linux/Ubuntu.</p>
          </motion.div>

          <motion.div className="feature-card" variants={fadeUpVariant} style={{ backgroundColor: '#eff6ff', borderColor: '#dbeafe' }} whileHover={{ scale: 1.02 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#bfdbfe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 style={{ margin: 0, color: '#0f172a' }}>How I Fix It? (Action)</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.95rem' }}>Saya menerapkan isolasi environment menggunakan venv dan membungkus layanan backend ke dalam Docker. Untuk mencegah bottleneck pada memori, saya melimitasi context window pada Llama 3.2 dan memakai strategi jaringan host.</p>
          </motion.div>
        </div>

        {/* Result */}
        <motion.div className="feature-card" variants={fadeUpVariant} style={{ backgroundColor: '#f3e8ff', borderColor: '#e9d5ff', textAlign: 'center', padding: '3rem 2rem' }} whileHover={{ scale: 1.01 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#d8b4fe', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
          </div>
          <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontSize: '1.5rem' }}>Hasil yang Dicapai (Result)</h3>
          <p style={{ color: '#475569', maxWidth: '700px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.7' }}>
            Sistem RAG berhasil beroperasi secara 100% offline dengan tingkat latensi respons yang dapat ditoleransi oleh hardware terbatas. Aplikasi kini memfasilitasi interaksi pengguna dengan dokumen laporan teknis secara instan dan aman dari kebocoran data.
          </p>
        </motion.div>
      </motion.section>

      <footer className="landing-footer" style={{ backgroundColor: '#020617', color: '#94a3b8', padding: '4rem 5% 2rem 5%', marginTop: '4rem', borderTop: 'none' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem', textAlign: 'left' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>Portofolio</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>Membuat Sistem yang aman, skalable, tampilan ramah untuk pengguna</p>
          </div>
          <div>
            <h4 style={{ color: '#f97316', marginBottom: '1.5rem', fontWeight: '600' }}>Navigasi</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem' }}>Beranda</a>
              <a href="#about" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem' }}>Tentang Saya</a>
              <a href="#challenges" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem' }}>Project</a>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#f97316', marginBottom: '1.5rem', fontWeight: '600' }}>Sumber Daya</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem' }}>Blog</a>
              <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem' }}>Mempelajari</a>
              <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem' }}>Kontak</a>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#f97316', marginBottom: '1.5rem', fontWeight: '600' }}>Terhubung</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'background 0.3s' }}><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg></a>
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'background 0.3s' }}><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg></a>
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'background 0.3s' }}><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M2 4l10 8 10-8"></path></svg></a>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid #1e293b', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} Portofolio. Wahyu Satrio W</p>
          <div style={{ backgroundColor: '#1e293b', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', letterSpacing: '0.05em', color: 'white' }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: '#38bdf8', borderRadius: '50%' }}></span>
            WEBSITE INI DIBANGUN MENGGUNAKAN: React + Vite + Framer Motion
          </div>
        </div>
      </footer>
    </div>
  );
}
