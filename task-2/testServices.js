import { fetchNobelPrizes } from './services.js';

// اختبار الدالة بدون أي فلاتر
fetchNobelPrizes({}, 
  data => console.log('All Prizes:', data),
  error => console.error('Error:', error)
);

// اختبار الدالة مع سنة وفئة معينة
fetchNobelPrizes({ year: '2020', category: 'phy' }, 
  data => console.log('Physics Prizes 2020:', data),
  error => console.error('Error:', error)
);