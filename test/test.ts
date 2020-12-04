var assert = require('assert');
import {formater} from '../src/lib/formater'

describe('Formater', function() {
    describe('toPercentage()', function() {
      it('should return 29.3% by input 0.293', function() {
        assert.strictEqual(formater.toPercentage(0.293), '29.3%')
      });
      it('should return 0.0% by input 0', function() {
        assert.strictEqual(formater.toPercentage(0), '0.0%')
      });
      it('should return 0.1% by input 0.0011', function() {
        assert.strictEqual(formater.toPercentage(0.0011), '0.1%')
      });
      it('should return 0.1% by input 0.0019', function() {
        assert.strictEqual(formater.toPercentage(0.0019), '0.2%')
      });
    });
    describe('toCurrency()', function() {
        it('should return $1,000  by input 1000', function() {
          assert.strictEqual(formater.toCurrency(1000), '$1,000')
        });
        it('should return $123  by input 123', function() {
            assert.strictEqual(formater.toCurrency(123), '$123')
        });
        it('should return $-123  by input abc', function() {
            assert.strictEqual(formater.toCurrency(-123), '$-123')
        });
      });
  });