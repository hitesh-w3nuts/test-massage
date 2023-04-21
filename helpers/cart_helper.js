const save_cart_item = (cartItem) => {
    const itemKey = new Date().getTime();
    if (window.localStorage !== undefined) {
        let data = window.localStorage.getItem('massage_mnl_cart_data');
        if (data !== null && data !== '') {
            let cartData = JSON.parse(data);
            if (cartData !== undefined) {
                let alreadyAddedKey = '';
                Object.entries(cartData).map((item) => {
                    const itemData = item[1];
                    const key = item[0];
                    if (itemData.productID === cartItem.productID && itemData.variationID === cartItem.variationID) {
                        alreadyAddedKey = key;
                    }
                })
                if (alreadyAddedKey !== '') {
                    cartData[alreadyAddedKey]['pax'] = cartItem.pax;
                    if (cartItem.user_requests !== '') {
                        cartData[alreadyAddedKey]['user_requests'] = cartItem.user_requests;
                    }
                } else {
                    cartData = {
                        ...cartData,
                        ...{ [itemKey]: cartItem }
                    }
                }
                localStorage.setItem('massage_mnl_cart_data', JSON.stringify(cartData));
            }
        } else {
            const items = {
                [itemKey]: cartItem
            }
            localStorage.setItem('massage_mnl_cart_data', JSON.stringify(items));
        }

    }
}

const get_cart_items = () => {
    if (window.localStorage !== undefined) {
        let data = window.localStorage.getItem('massage_mnl_cart_data');
        if (data !== null && data !== '' && data !== undefined) {
            return JSON.parse(data);
        }
    }
    return false;
}

const get_default_booking_data = () => {
    const cartData = get_cart_items();
    let data = false;
    if (cartData) {
        Object.entries(cartData).map((item, i) => {
            if (i == 0) {
                const itemData = item[1];
                data = {
                    main_area_id: itemData.main_area_id,
                    user_location: itemData.user_location,
                    user_location_id: itemData.user_location_id,
                    user_sub_location: itemData.user_sub_location,
                    user_sub_location_id: itemData.user_sub_location_id,
                    user_sel_date: itemData.user_sel_date,
                    user_sel_date_text: itemData.user_sel_date_text,
                    user_sel_time_text: itemData.user_sel_time_text,
                    minimumTime: itemData.minimumTime
                }
            }
        })
    }

    return data;
}

const formatMoney = (number, decPlaces, decSep, thouSep) => {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substring(0, j) + thouSep : "") +
        i.substring(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

const get_total_cart_amount = () => {
    const cartData = get_cart_items();
    let totalAmount = 0;
    if (cartData !== null) {
        Object.entries(cartData).map((item, i) => {
            totalAmount = totalAmount + (item[1].productPrice * item[1].pax);
        });
    }
    return { "cartSubTotal": totalAmount, "cartTotal": (totalAmount + 100) };
}

const check_for_minimum = () => {
    const cartData = get_cart_items();
    let minimumTime = 0;
    let productsTime = 0;
    let location = '';
    if (cartData !== null) {
        Object.entries(cartData).map((item, i) => {
            const itemKey = item[0];
            const itemData = item[1];
            minimumTime = itemData['minimumTime'];
            location = itemData['user_sub_location'];
            productsTime = productsTime + (parseInt(itemData['variationMinutes']) * itemData.pax);
        });
    }
    let result = false;
    if(parseFloat(minimumTime) > productsTime){
        result = true;
    }

    let hourText = '';
    const hour = (minimumTime / 60);
    if(hour < 1){
        hourText = '30 minutes';
    }else if(hour == 1){
        hourText = '1 hour';
    }else{
        hourText = `${hour} hours`;
    }
    return {'error': result, 'location':location, hourText: hourText}
}

const save_cart = (cartData) => {
    let newCartData = {};
    if (cartData !== null) {
        Object.entries(cartData).map((item, i) => {
            const itemKey = item[0];
            const itemData = item[1];
            if (itemData !== undefined) {
                newCartData = {
                    ...newCartData,
                    ...{ [itemKey]: itemData }
                }
            }
        });
        localStorage.setItem('massage_mnl_cart_data', JSON.stringify(newCartData));
    }
}

const clear_cart_data = () => {
    localStorage.setItem('massage_mnl_cart_data', '');
}

const save_discount_data = (data) => {
    if (data !== null) {
        localStorage.setItem('massage_mnl_discount_data', JSON.stringify(data));
    }
}

const get_discount_data = (data) => {
    if (window.localStorage !== undefined) {
        let data = window.localStorage.getItem('massage_mnl_discount_data');
        if (data !== null && data !== '' && data !== undefined) {
            return JSON.parse(data);
        }
    }
    return false;
}

export {
    save_cart_item,
    get_cart_items,
    get_default_booking_data,
    formatMoney,
    get_total_cart_amount,
    save_cart,
    check_for_minimum,
    clear_cart_data,
    save_discount_data,
    get_discount_data
};