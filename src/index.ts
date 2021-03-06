import manifest from './manifest.json';
import { togglePopup } from './popup';
import './styles.css';

declare global {
  interface Window {
    isOpen: boolean;
  }
}

const whenReady = () =>
  new Promise<void>((res, rej) => {
    let timeout: any;
    const interval = setInterval(() => {
      const templateButton = document.querySelector('.css-109f9np.e1h77j9v7')!;
      if (templateButton !== null) {
        clearTimeout(timeout);
        clearInterval(interval);
        res();
      }
    }, 100);
    timeout = setTimeout(() => {
      clearTimeout(timeout);
      clearInterval(interval);
      rej();
    }, 5000);
  });

// 엔트리 이야기 글쓰기 섹션에 파일 업로드 버튼 추가 및 클릭 시 기능 구현
const main = () => {
  if (
    !(
      location.href.includes('https://playentry.org/community/entrystory/') ||
      (location.href.includes('https://playentry.org/profile/') &&
        location.href.includes('/community/entrystory'))
    )
  )
    return;

  const buttonContainer = document.querySelector('.css-ljggwk.e1h77j9v9')!;
  const buttonList = buttonContainer.querySelectorAll(
    '.css-109f9np.e1h77j9v7'
  )!;
  const templateButton = buttonList[0];
  const info = document.querySelector('.css-1lpaq59.e1h77j9v0 .link')!;

  if (buttonList.length === 2) buttonList[1].remove();

  const button = templateButton.cloneNode(true) as HTMLDivElement;

  info.textContent = `entry-uploader v${manifest.version}`;

  button.classList.add('upload');
  buttonContainer.insertBefore(button, templateButton.nextSibling);

  button.onclick = () => togglePopup();
};

// 페이지가 로드될 시 main 함수 실행
whenReady().then(main);

// 현재 URL
let lastUrl = location.href;

new MutationObserver(() => {
  const url = location.href;

  // SPA가 사용된 부분 (만들기 페이지를 제외한 모든 페이지) 으로 이동하며 URL이 변경되었다면 main 함수 실행
  if (url !== lastUrl) {
    lastUrl = url;
    main();
  }
}).observe(document, { subtree: true, childList: true });
