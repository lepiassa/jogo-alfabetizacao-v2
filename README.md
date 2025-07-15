# Aventura da Alfabetização

Um jogo interativo de alfabetização para crianças de até 8 anos, com estética inspirada no universo do Mario.

## Características do Jogo

- **Interface responsiva**: Funciona bem em celular, tablet e desktop
- **Estética Mario**: Cenários coloridos com plataformas e elementos de fantasia
- **Dois tipos de desafios**:
  - Quiz de múltipla escolha (sílabas, formação de palavras, identificação de letras)
  - Complete a frase (arrastar/digitar palavras com apoio de imagens)
- **Feedback positivo**: Sons, emojis e efeitos visuais a cada acerto
- **Três fases temáticas**: Floresta Mágica, Castelo Encantado, Montanha dos Desafios
- **Sistema de pontuação**: Moedas e vidas para manter o engajamento
- **Áudio em português**: Pronunciação das palavras para auxiliar no aprendizado

## Como Usar

1. **Abrir o jogo**: Abra o arquivo `index.html` em qualquer navegador web moderno
2. **Começar**: Clique em "Começar Aventura" na tela inicial
3. **Escolher fase**: Selecione uma das três fases disponíveis
4. **Jogar**: Responda às perguntas e complete as frases
5. **Progredir**: Ganhe pontos e avance pelas questões

## Estrutura dos Arquivos

```
jogo_alfabetizacao/
├── index.html          # Arquivo principal do jogo
├── css/
│   └── style.css       # Estilos e animações
├── js/
│   └── script.js       # Lógica do jogo
├── assets/
│   ├── images/         # Ilustrações e cenários
│   └── audio/          # Arquivos de áudio das palavras
├── data.txt           # Lista de palavras e frases utilizadas
└── README.md          # Este arquivo
```

## Requisitos Técnicos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexão com a internet não é necessária (jogo funciona offline)

## Hospedagem

Para hospedar o jogo online:

1. **Hospedagem gratuita**: Faça upload dos arquivos para GitHub Pages, Netlify ou Vercel
2. **Servidor próprio**: Copie todos os arquivos para o diretório web do seu servidor
3. **Teste local**: Abra o arquivo `index.html` diretamente no navegador

## Palavras e Frases Incluídas

O jogo inclui palavras simples adequadas para alfabetização:
- **Palavras**: GATO, BOLA, PATO, CASA, MESA, SAPO, RATO, FACA, DEDO, BOCA
- **Frases**: "O ___ mia", "A ___ rola", "A ___ é bonita", etc.

## Personalização

Para adicionar novas palavras ou frases, edite o arquivo `js/script.js` na seção `gameData`. Cada fase pode ter seus próprios conjuntos de perguntas de quiz e desafios de completar frases.

## Suporte

Este jogo foi desenvolvido com HTML, CSS e JavaScript puro, sem dependências externas, garantindo compatibilidade máxima e facilidade de manutenção.

---

**Desenvolvido para promover o aprendizado lúdico e interativo da alfabetização!** 🎮📚

