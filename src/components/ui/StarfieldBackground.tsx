'use client';

import React, { useEffect, useRef } from 'react';

export const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{ x: number; y: number; size: number; speed: number; opacity: number; dir: number }> = [];
    const starCount = 120;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.05 + 0.01,
          opacity: Math.random() * 0.8 + 0.2,
          dir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        // Twinkle effect: slowly change opacity
        star.opacity += star.speed * star.dir * 0.1;
        if (star.opacity > 1 || star.opacity < 0.2) {
          star.dir *= -1;
        }

        ctx.fillStyle = `rgba(229, 231, 235, ${star.opacity})`;
        ctx.shadowBlur = star.size * 2;
        ctx.shadowColor = '#6C5CE7';
        ctx.fill();

        // Slow movement downwards
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#0B0E23]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
