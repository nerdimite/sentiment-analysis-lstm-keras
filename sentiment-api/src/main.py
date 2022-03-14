import os
from hub import hub_handler
from tensorflow import keras
from tensorflow.keras.preprocessing.sequence import pad_sequences


# load model and tokenizer
MODEL_DIR = os.getenv("MODEL_DIR")

model = keras.models.load_model(os.path.join(MODEL_DIR, 'model-twitter.h5'))

with open(os.path.join(MODEL_DIR, 'tokenizer-twitter.json'), 'r') as f:
    tokenizer = keras.preprocessing.text.tokenizer_from_json(f.read())

def preprocess(text, maxlen=40):
    '''Preprocesses a piece of text'''
        
    # convert string to sequence of integers based on vocab
    sequences = tokenizer.texts_to_sequences([text])
    
    # pad sequences to fixed length
    padded = pad_sequences(sequences, maxlen=maxlen, truncating='post', padding='post')
    
    return padded

def predict(text):
        
    # preprocess text
    processed_text = preprocess(text)
    
    # predict
    pos_prob = model.predict(processed_text).squeeze().item()
    neg_prob = 1 - pos_prob
    
    if pos_prob < 0.5:
        output = [('Negative', neg_prob), ('Positive', pos_prob)]
    else:
        output = [('Positive', pos_prob), ('Negative', neg_prob)]
        
    output = list(map(lambda x: (x[0], round(x[1] * 100, 2)), output))
    
    return output

# dummy inference to cache the model
print('Dummy Prediction:', predict('This is a very nurturing environment'))

@hub_handler
def inference_handler(inputs, _):
    '''The main inference function which gets triggered when the API is invoked'''

    output = predict(inputs)

    return output
