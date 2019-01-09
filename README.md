뭐하는 애에요?
=====
Javascript에서 비트마스크를 관리해주는 오브젝트입니다. C에서 64bits 비트마스크를 사용하는데, Javascript로 불러올 경우 64비트를 관리할 수 없기 때문에 만들었습니다. 내부적으로는 32bits 비트마스크를 두 개 가지고 있으며, 64번째 이후의 비트에 접근할 시에는 내부적으로 새로운 배열을 추가하여 관리합니다. 간단하게 설명하면 다음과 같습니다.
- var a = new bitsToArrays() -> bitsToArrays 객체를 초기화합니다.
- var b = new bitsToArrays({max: 10}) -> bitsToArrays 객체를 초기화합니다. 단, 각 배열의 비트마스크 최대 크기는 10입니다.
- a.set(31) -> 배열에 저장된 첫 번째 integer값의 31번째 비트를 1로 체크.
- a.set(32) -> 배열에 저장된 두 번째 integer값의 0번째 비트를 1로 체크. (인덱스는 자동으로 계산됩니다.)
- a.set(64) -> 배열에 세 번째 integer값을 추가하고, 세 번째 integer값의 0번째 비트를 1로 체크. (인덱스는 자동으로 계산됩니다.)

포함된 메서드
=====
- getArray(number)
-- 내부배열의 요소를 반환합니다. 파라메터는 0~1입니다.
- getMax()
-- 내부배열 각 항목의 최대값을 반환합니다. 기본값은 32입니다.
- get(number)
-- 인덱스로 전달받은 비트값이 설정되었는지 확인합니다. 설정되어있으면 0이 아닌 값이, 설정되어있지 않으면 0이 반환됩니다.
- getBoolean(number)
-- 인덱스로 전달받은 비트값이 설정되었는지 확인합니다. 설정되어있으면 true, 설정되어있지 않으면 false가 반환됩니다.
- set(number)
-- 인덱스로 전달받은 비트값을 설정합니다. 내부배열에 해당값이 없는 경우, 새 값을 추가합니다.
ex) 65번째 비트를 설정하는 경우
```var c = new bitsToArray();
c.set(64); //65번째 비트를 설정합니다. 내부배열의 새번째 integer값을 추가하고, 비트마스크를 설정합니다.
//내부 배열은 다음과같이 설정됩니다. [0, 0, 2]```
- del(number)
-- 인덱스로 전달받은 비트값을 초기화합니다.

사용법은요?
=====
아래의 예시를 확인해주세요.
```
//new 키워드를 이용하여 bitsToArrays 객체를 생성할 수 있습니다.
var bitmask = new bitsToArrays();

//set 메서드를 사용하여 다음과 같은 방법으로 비트마스크를 설정할 수 있습니다.
bitmask.set(0); //첫번째 비트를 1로 세팅합니다. 내부 배열은 다음처럼 설정됩니다. [1, 0]
bitmask.set(31); //32번째 비트를 1로 세팅합니다. 내부 배열은 다음처럼 설정됩니다. [-2147483647, 0]
bitmask.set(32); //33번째 비트를 1로 세팅합니다. 내부 배열은 다음처럼 설정됩니다. [-2147483647, 1]
bitmask.set(63); //64번째 비트를 1로 세팅합니다. 내부 배열은 다음처럼 설정됩니다. [-2147483647, -2147483647]

//get 메서드를 사용하여 다음과 같은 방법으로 비트마스크를 확인할 수 있습니다.
bitmask.get(0); //첫번째 비트가 설정됐는지 확인합니다. 위에서 설정한 비트이기 때문에, 1이 반환됩니다.
bitmask.get(1); //두번째 비트가 설정됐는지 확인합니다. 위에서 설정한 비트가 아니므로, 0이 반환됩니다.
bitmask.get(31); //32번째 비트가 설정됐는지 확인합니다. 위에서 설정한 비트이기 때문에, -2147483648이 반환됩니다.

//getBoolean 메서드를 사용하여 다음과 같은 방법으로 비트마스크를 확인할 수 있습니다.
bitmask.get(0); //첫번째 비트가 설정됐는지 확인합니다. 위에서 설정한 비트이기 때문에, true가 반환됩니다.
bitmask.get(1); //두번째 비트가 설정됐는지 확인합니다. 위에서 설정한 비트가 아니므로, false가 반환됩니다.
bitmask.get(31); //32번째 비트가 설정됐는지 확인합니다. 위에서 설정한 비트이기 때문에, true가 반환됩니다.

//del 메서드를 사용하여 다음과 같은 방법으로 비트마스크를 지울 수 있습니다.
bitmask.del(0); //첫번째 비트를 초기화합니다.
bitmask.get(0); //첫번째 비트를 확인합니다. 초기화됐으므로, 0이 반환됩니다.
bitmask.getBoolean(0); //첫번째 비트를 확인합니다. 초기화됐으므로, false가 반환됩니다.

//getArray 메서드를 사용하여 다음과 같은 방법으로 내부배열의 값을 가져올 수 있습니다. 큰 의미는 없지만.
bitmask.getArray(0); //내부배열의 첫번째 integer를 가져옵니다. 위에서 1, 32번째 비트를 설정했기 때문에 -2147483648이 반환됩니다.
bitmask.getArray(1); //내부배열의 두번째 integer를 가져옵니다. 위에서 32, 64번째 비트를 설정했기 때문에 -2147483648이 반환됩니다.
bitmask.getArray(2); //내부배열의 세번째 integer를 가져옵니다. 세번째 요소가 없으므로, null이 반환됩니다.

//getMax 메서드를 사용하여 다음과 같은 방법으로 하나의 비트가 몇개의 비트마스크를 가지고 있는지 확인 수 있습니다. 큰 의미는 없지만.
bitmask.getMax(); //초기값이므로 32를 반환합니다.
bitmask2 = new bitsToArrays({max: 10}); //bitmask2를 만들고, 생성자에 옵션을 10으로 설정합니다.
bitmask2.set(10); //11번째 비트를 설정합니다. 각 비트의 최대값은 10이므로, 내부 배열은 다음처럼 설정됩니다. [0, 1]
```
