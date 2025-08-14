import { useState, useEffect } from 'react';

export async function generateRosco() {
  try {
    const response = await fetch('/data/glossary.json');
    const glossary = await response.json();

    const rosco = Object.entries(glossary).map(([letter, words]) => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      return {
        letter: letter.toUpperCase(),
        word: randomWord.word.toUpperCase(),
        definition: randomWord.definition,
        status: 'pending' // puede ser 'correct', 'incorrect', 'passed'
      };
    });

    // Ordenar alfabéticamente
    return rosco.sort((a, b) => a.letter.localeCompare(b.letter));
  } catch (error) {
    console.error('Error al generar el rosco:', error);
    return [];
  }
}


