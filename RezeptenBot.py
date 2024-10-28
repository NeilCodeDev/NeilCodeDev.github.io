import requests
import telebot

API_KEY = "SPOONACULAR_API_KEY"
TELEGRAM_BOT_TOKEN = 'TELEGRAM_BOT_TOKEN'

url = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients='

bot = telebot.TeleBot(TELEGRAM_BOT_TOKEN)

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, "Hallo! 👋 Ich bin dein Rezept-Bot! 🥘\n\nIch helfe dir dabei, köstliche Rezepte zu finden, basierend auf den Zutaten, die du hast.")
    bot.send_message(message.chat.id, 'Schreibe mir die Zutaten, die du hast, getrennt durch Kommas. Zum Beispiel: "Äpfel, Milch, Mehl".')

@bot.message_handler(commands=['help'])
def help(message):
    bot.send_message(message.chat.id, "So funktioniert es:\n1. Schreibe mir einfach die Zutaten, die du zur Verfügung hast, getrennt durch Kommas. Zum Beispiel: Äpfel, Milch, Mehl.\n2. Ich werde dir Rezepte zeigen, die diese Zutaten verwenden, und dir sagen, welche Zutaten du noch benötigst.")

@bot.message_handler()
def gatInfo(message):
    ingredients = message.text
    number = 1
    theUrl = f"{url}{ingredients}&number={number}&apiKey={API_KEY}"
    r = requests.get(theUrl)
    recipes = r.json()

    if r.status_code != 200:
        bot.send_message(message.chat.id, "Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.")
        return

    if not recipes:
        bot.send_message(message.chat.id, "Keine Rezepte gefunden mit diesen Zutaten. Bitte versuche es mit anderen Zutaten oder prüfe die Schreibweise.")
        return

    for recipe in recipes:
        missedIng = recipe["missedIngredients"]
        usedIng = recipe["usedIngredients"]
        title = recipe['title']
        image = recipe['image']

        missedProdukten = ""
        usedProdukten = ""

        for ingredients in missedIng:
            theAmount = str(ingredients['amount'])
            theUnit = str(ingredients['unit'])
            ingName = ingredients['name']
            missedProdukten += ingName + " - " + theAmount + " " + theUnit + "\n"

        for ingredients in usedIng:
            ingUsedName = ingredients['name']
            theAmountUsed = str(ingredients['amount'])
            theUnitUsed = str(ingredients['unit'])

            usedProdukten += ingUsedName + " - " + theAmountUsed + " " + theUnitUsed + "\n"

    bot.send_message(message.chat.id, title)
    bot.send_photo(message.chat.id, image)

    bot.send_message(message.chat.id, f"Zutaten:\n\n{usedProdukten}{missedProdukten}")


bot.infinity_polling()