import json
import random

with open('100words.json') as read_file:
    words = json.load(read_file)

word_count = len(words)


    

#Functions   
    
     
def crew_word(word_num):
    random_word = words[word_num]["wort"]
    print("Du bist ein Crew Mate")
    print("Wort: " + random_word, end='')
    return random_word
    
    
def imposter_word (word_num):
    random_help_num = random.randrange(0, 2)
    random_help = words[word_num]["hilfswoerter"][random_help_num]
    print("Du bist IMPOSTER")
    print("Hilfswort: " + random_help, end='')
    return random_help
    
def start_round():
    random_word_num = random.randrange(0,word_count)
    
    player_count = int(input("Zahl von 3+ eingeben"))
    imposter_count = int(input("Zahl von 1+ eingeben"))
    crew_count = player_count - imposter_count
    if imposter_count > player_count:
        imposter_count = 1
    

    for x in range(player_count):
        if imposter_count > 0 and crew_count > 0:
            if random.choice([True, False]) == True: # True for Imposter, False for Crewmate
                imposter_word(random_word_num)
                imposter_count -= 1
            else:
                crew_word(random_word_num)
                crew_count -= 1
        elif imposter_count == 0:
            crew_word(random_word_num)
        elif crew_count == 0:
            imposter_word(random_word_num)
        input()
#Main
start_round()