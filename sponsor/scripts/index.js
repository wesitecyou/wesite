let selectedAmount = 5; // 默认选择金额为5元
let currentPaymentType = '';

document.addEventListener('DOMContentLoaded', function () {
    const amountButtons = document.querySelectorAll('.amount-button');
    const alipayButton = document.querySelector('.alipay-button');
    const wechatButton = document.querySelector('.wechat-button');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');

    // 初始化默认选择
    updateSelectedButton();

    // 金额按钮点击事件
    amountButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const amount = parseInt(button.getAttribute('data-amount'));
            if (selectedAmount !== amount) {
                selectedAmount = amount;
                updateSelectedButton();
            }
        });
    });

    // 支付宝按钮点击事件
    alipayButton.addEventListener('click', () => {
        currentPaymentType = '支付宝';
        showPopup('支付宝', selectedAmount);
    });

    // 微信按钮点击事件
    wechatButton.addEventListener('click', () => {
        currentPaymentType = '微信';
        showPopup('微信', selectedAmount);
    });

    // 显示收款码弹窗
    function showPopup(paymentType, amount) {
        const qrSrc = getQRCodeSrc(paymentType, amount);

        // 设置弹窗内容为收款码
        popupContent.innerHTML = `
                    <div class="message-display">金额: ¥${amount} - ${paymentType}收款码</div>
                    <img id="qr-code" class="qr-code" src="${qrSrc}" alt="收款码">
                `;
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

    // 获取对应的收款码图片地址
    function getQRCodeSrc(paymentType, amount) {
        if (paymentType === '支付宝') {
            switch (amount) {
                case 5:
                    return document.getElementById('alipay-amount-1').src;
                case 10:
                    return document.getElementById('alipay-amount-2').src;
                case 15:
                    return document.getElementById('alipay-amount-3').src;
                default:
                    return '';
            }
        } else if (paymentType === '微信') {
            switch (amount) {
                case 5:
                    return document.getElementById('wechat-amount-1').src;
                case 10:
                    return document.getElementById('wechat-amount-2').src;
                case 15:
                    return document.getElementById('wechat-amount-3').src;
                default:
                    return '';
            }
        }
        return '';
    }

    // 更新选中的金额按钮样式
    function updateSelectedButton() {
        amountButtons.forEach((btn) => {
            const amount = parseInt(btn.getAttribute('data-amount'));
            if (amount === selectedAmount) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
    }

    // 关闭弹窗函数
    window.closePopup = function () {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }
});