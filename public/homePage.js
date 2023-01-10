// Кнопка выхода

const logout = new LogoutButton();
logout.action = () => {
   ApiConnector.logout((response) => {
    if(response.success){
       location.reload();
    } else {
        logout.setLoginErrorMessage(response.error);    
    }
   });
};

// Получение информации о пользователе

ApiConnector.current((response) => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
    };
});

// Получение текущих курсов валюты
 
const ratesBoard = new RatesBoard();
    ApiConnector.getStocks(response => {
        if(response.success){
            ratesBoard.fillTable(response.data);
        }
    })

setInterval(() => {
    ApiConnector.getStocks(response => {
        if(response.success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}, 60000);

// Операции с деньгами:

const moneyManager = new MoneyManager();

//----> пополнение баланса

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Кошелёк успешно пополнен');

        } else {
            moneyManager.setMessage(response.success, response.error);
        };
    });
};

//----> конвертирование валюты

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертирование прошло успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        };
    });
};

//----> перевод валюты

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Перевод валюты прошел успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        };
    });
};

// Работа с избранным:

const favoritesWidger = new FavoritesWidget();
 
//----> запрос начального списка избранных

ApiConnector.getFavorites((response) => {
    if(response.success){
        favoritesWidger.clearTable();
        favoritesWidger.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
});

//----> добавление пользователя в список избранных

favoritesWidger.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success){
            favoritesWidger.clearTable();
            favoritesWidger.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidger.setMessage(response.success, response.error);
        };
    });
};

//----> удаление пользователя из списка избранных

favoritesWidger.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success){
            favoritesWidger.clearTable();
            favoritesWidger.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidger.setMessage(response.success, response.error);
        };
    });
};



 
