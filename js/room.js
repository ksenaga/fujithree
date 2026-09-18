// 管理画面（admin.php）以外では定義されていないため、常にfalse扱いにする
const canEdit = typeof CAN_EDIT !== 'undefined' && CAN_EDIT;

// 保存待ちの変更を building/roomNo をキーに保持する
const pendingChanges = new Map();

// DOMの読み込み完了後に実行
document.addEventListener('DOMContentLoaded', () => {

  // 部屋データをAPIから取得
  fetch('api/getRoom.php')
    .then(res => res.json())
    .then(data => {
      // 建物ごとに描画
      const buildingNames = {
        'naha_tahara': 'ナハ田原',
        'hibis_shuri': 'ハイビス首里',
        'satellite_tahara': 'サテライト田原'
      };

      for (const table in data) {
        renderBuilding(table, data[table], buildingNames[table]);
      }
    })
    .catch(err => console.error(err));

  if (canEdit) {
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.addEventListener('click', saveChanges);
  }
});

/**
 * 建物ごとの部屋一覧を描画
 * @param {string} table テーブル名（保存時に使用）
 * @param {Object} rooms 部屋データ（roomNo: status）
 * @param {string} buildingName 建物名
 */
const renderBuilding = (table, rooms, buildingName) => {
  const container = document.getElementById('rooms');

  // 建物ラッパー
  const buildingDiv = document.createElement('div');
  buildingDiv.className = 'building';

  // 建物タイトル
  const title = document.createElement('h2');
  title.textContent = buildingName;
  buildingDiv.appendChild(title);

  // 階ごとに自動で判定するため、room_no の百の位を取得
  const floors = [...new Set(Object.keys(rooms).map(r => Math.floor(r/100)))].sort((a,b)=>a-b);

  floors.forEach(floor => {
    const floorDiv = document.createElement('div');
    floorDiv.className = 'floor';

    const floorTitle = document.createElement('h3');
    floorTitle.textContent = `${floor}階`;
    floorDiv.appendChild(floorTitle);

    const list = document.createElement('div');
    list.className = 'room-list';

    // その階の部屋だけ抽出してソート
    const floorRooms = Object.keys(rooms)
      .filter(r => Math.floor(r/100) === floor)
      .sort((a,b)=>a-b);

    floorRooms.forEach(roomNo => {
      const status = rooms[roomNo];
      const card = document.createElement('div');
      card.className = `room-card ${status}`;
      card.dataset.table = table;
      card.dataset.room = roomNo;
      card.innerHTML = `
        <div>${roomNo}</div>
        <div class="room-status">${status === 'vacant' ? '空室' : '入居中'}</div>
      `;

      if (canEdit) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => toggleRoomStatus(card));
      } else {
        card.style.cursor = 'default'; // クリック不可
      }

      list.appendChild(card);
    });

    floorDiv.appendChild(list);
    buildingDiv.appendChild(floorDiv);
  });

  container.appendChild(buildingDiv);
};

/**
 * 管理画面での部屋カードクリック：空室⇔入居中を切り替えて保存待ちに積む
 * @param {HTMLElement} card
 */
const toggleRoomStatus = card => {
  const newStatus = card.classList.contains('vacant') ? 'occupied' : 'vacant';

  card.classList.remove('vacant', 'occupied');
  card.classList.add(newStatus);
  card.querySelector('.room-status').textContent = newStatus === 'vacant' ? '空室' : '入居中';

  const key = `${card.dataset.table}_${card.dataset.room}`;
  pendingChanges.set(key, {
    table: card.dataset.table,
    room_no: Number(card.dataset.room),
    status: newStatus === 'occupied' ? 1 : 0
  });
};

/**
 * 保存結果を画面上のメッセージ欄に表示する
 * @param {string} message
 * @param {'success'|'error'} type
 */
const showSaveMessage = (message, type) => {
  const el = document.getElementById('saveMessage');
  if (!el) return;

  el.textContent = message;
  el.className = `save-message ${type}`;
  el.hidden = false;

  clearTimeout(showSaveMessage._timer);
  showSaveMessage._timer = setTimeout(() => {
    el.hidden = true;
  }, 5000);
};

/**
 * 保存待ちの変更をまとめて updateRoom.php に送信する
 */
const saveChanges = () => {
  if (pendingChanges.size === 0) {
    showSaveMessage('変更はありません', 'error');
    return;
  }

  fetch('api/updateRoom.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      csrf_token: CSRF_TOKEN,
      changes: Array.from(pendingChanges.values())
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        pendingChanges.clear();
        showSaveMessage('保存しました', 'success');
      } else {
        showSaveMessage(data.error || '保存に失敗しました', 'error');
      }
    })
    .catch(err => {
      console.error(err);
      showSaveMessage('保存に失敗しました', 'error');
    });
};
