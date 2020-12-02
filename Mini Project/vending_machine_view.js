class ViewMachine {
    constructor(reference, walletData, {menuDataArr}) {
        this.menuArr = [...reference.menu];
        this.wrapArr = [...reference.moneyWrap];
        this.totalEl = reference.walletTotal;
        this.processEl = reference.process;
        this.coinsWindowEl = reference.coinsWindow;
        this.menuData = menuDataArr; // 매뉴데이터 - 배열
        this.walletData = walletData; // 지갑데이터 - 객체
        this.coinsWindow = 0;
    }
    // this.wallet의 데이터를 사용 → wallet 개수, 합계 출력
    viewWallet() {
        const elArr = this.wrapArr.map(el => el.lastElementChild);
        elArr.forEach((el, i) => el.innerText = this.walletData.moneyNumArr[i]);
        this.totalEl.innerText = this.walletData.total;
    }

    // wallet 클릭 이벤트
    setWalletEvent() {
        const elArr = this.wrapArr.map(el => el.firstElementChild);
        elArr.forEach(el => el.addEventListener('click', this.checkWallet.bind(this)));
    }
    checkWallet({target}) {
        const text = target.innerText;
        const amount = text.substring(0, text.length - 1);
        const idx = this.walletData.value.indexOf(amount);
        if(this.walletData.moneyNumArr[idx] < 1) return; // 현금 개수가 1보다 작다면 리턴
        else {
            this.fixWallet(idx);
            this.viewProcess(text);
            this.viewCoinsWindow(amount);
            this.viewPossibleMenu();
        };
    }
    // this.wallet 값을 변경 (moneyNumArr 현금 개수, total 합계)
    fixWallet(idx) {
        this.walletData.moneyNumArr[idx]--;
        this.walletData.sumAmount(this.walletData);
        this.viewWallet();
    }
    // process창에 과정 출력
    viewProcess(text) {
        this.processEl.innerHTML += `<span> ${text} 투입!</span> <br>`;
    }
    // coins window창에 투입 금액 출력
    viewCoinsWindow(amount) {
        const num = parseInt(amount);
        this.coinsWindow += num;
        this.coinsWindowEl.innerText = this.coinsWindow;
    }
    // 구매가능한 메뉴에 클래스 추가
    viewPossibleMenu() {
        const objArr = this.menuData.filter(el => el.price <= this.coinsWindow);
        const idxArr = objArr.map(el => el.number - 1);
        console.log(idxArr);
        idxArr.forEach(idx => {
            this.menuArr[idx].firstElementChild.nextElementSibling.classList.add('possible_name');
            this.menuArr[idx].lastElementChild.classList.add('possible_price');
        });
    }
}


// ------ test ------
const viewMachine = new ViewMachine(reference, walletData, menuData);
viewMachine.viewWallet();
viewMachine.setWalletEvent();