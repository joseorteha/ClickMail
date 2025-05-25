import React, { useEffect, useState, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import type { DriveStep } from 'driver.js';

// Extiende el tipo DriveStep para asegurarnos de que sea compatible
type TutorialStep = DriveStep;

interface TutorialGuideProps {
  steps: TutorialStep[];
  isActive: boolean;
  onComplete: () => void;
  onClose?: () => void;
}

const TutorialGuide: React.FC<TutorialGuideProps> = ({ 
  steps, 
  isActive, 
  onComplete,
  onClose 
}) => {
  const driverRef = useRef<any>(null);
  
  useEffect(() => {
    // Inicializar driver.js
    driverRef.current = driver({
      showProgress: true,
      showButtons: ['close', 'next', 'previous'],
      steps: steps,
      onDestroyStarted: () => {
        if (onClose) {
          onClose();
        }
      },
      onDestroyed: () => {
        onComplete();
      }
    });
    
    // Iniciar el tutorial si isActive es true
    if (isActive && driverRef.current) {
      driverRef.current.drive();
    }
    
    // Limpiar al desmontar
    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, [isActive, steps, onComplete, onClose]);
  
  return null; // Este componente no renderiza nada visible
};

export default TutorialGuide;
