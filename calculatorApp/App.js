import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const { width } = Dimensions.get('window');
const buttonMargin = 4;
const numButtonsPerRow = 4;
const buttonSize = (width - (buttonMargin * 2 * numButtonsPerRow) - 16) / numButtonsPerRow;

const buttonShape = 'square';

const getBorderRadius = () => {
  switch (buttonShape) {
    case 'circle':
      return buttonSize;
    case 'rounded':
      return 12;
    case 'square':
    default:
      return 0;
  }
};

export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [lastPressedEqual, setLastPressedEqual] = useState(false);
  const [clearLabel, setClearLabel] = useState('AC');

  const handlePress = (value) => {
    if (value === 'C' || value === 'AC') {
      if (lastPressedEqual) {
        setExpression('');
        setResult('');
        setClearLabel('AC');
        setLastPressedEqual(false);
        return;
      }

      if (expression.length > 0) {
        const newExpr = expression.slice(0, -1);
        setExpression(newExpr);
        setClearLabel(newExpr.length ? 'C' : 'AC');
      } else {
        setExpression('');
        setResult('');
        setClearLabel('AC');
      }
      setLastPressedEqual(false);
      return;
    }

    if (value === '=') {
      try {
        const replacedExpr = expression.replace(/÷/g, '/').replace(/x/g, '*');
        const evalResult = eval(replacedExpr);
        setResult(evalResult.toString());
        setExpression(evalResult.toString());
        setLastPressedEqual(true);
        setClearLabel('AC');
      } catch (e) {
        setResult('Error');
      }
      return;
    }

    if (value === '+/-') {
      const lastNumberMatch = expression.match(/(-?\d+\.?\d*)$/);
      if (!lastNumberMatch) return;

      const lastNumber = lastNumberMatch[0];
      const toggledNumber = parseFloat(lastNumber) * -1;

      const newExpr = expression.slice(0, -lastNumber.length) + toggledNumber.toString();
      setExpression(newExpr);
      setClearLabel('C');
      return;
    }

    if (value === '%') {
      const lastNumberMatch = expression.match(/(\d+\.?\d*)$/);
      if (!lastNumberMatch) return;

      const lastNumber = lastNumberMatch[0];
      const percentValue = parseFloat(lastNumber) / 100;

      const newExpr = expression.slice(0, -lastNumber.length) + percentValue.toString();
      setExpression(newExpr);
      setClearLabel('C');
      return;
    }

    if (lastPressedEqual && /[0-9.]/.test(value)) {
      setExpression(value);
      setResult('');
      setLastPressedEqual(false);
      setClearLabel('C');
      return;
    }

    setExpression(prev => prev + value);
    setClearLabel('C');
    setLastPressedEqual(false);
  };

  const buttons = [
    [clearLabel, '+/-', '%', '÷'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{result || expression || '0'}</Text>
      </View>

      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((btnText) => {
            const isZero = btnText === '0';
            const isOperator = ['÷', 'x', '-', '+', '='].includes(btnText);
            const isTopRow = rowIndex === 0;

            return (
              <TouchableOpacity
                key={btnText}
                style={[
                  styles.button,
                  isTopRow && styles.buttonTopRow,
                  isOperator && styles.buttonLilac,
                  isZero && styles.buttonZero,
                  { borderRadius: getBorderRadius() }
                ]}
                onPress={() => handlePress(btnText)}
              >
                <Text style={[
                  styles.buttonText,
                  (isOperator || isZero || btnText === clearLabel) && styles.buttonTextBlack
                ]}>
                  {btnText}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingBottom: 8,
    justifyContent: 'flex-end',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  displayText: {
    fontSize: 64,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  button: {
    height: buttonSize,
    width: buttonSize,
    backgroundColor: '#6b5a75',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: buttonMargin,
  },
  buttonTopRow: {
    backgroundColor: '#ccbed4',
  },
  buttonLilac: {
    backgroundColor: '#d7bae8',
  },
  buttonText: {
    fontSize: 32,
    color: '#fff',
  },
  buttonTextBlack: {
    color: '#000',
  },
  buttonZero: {
    width: buttonSize * 2 + buttonMargin * 2,
    alignItems: 'flex-start',
    paddingLeft: 32,
  },
});
