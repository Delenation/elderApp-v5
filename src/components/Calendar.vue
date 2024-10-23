<template>
	<div class="__calendar" v-if="calendarInit">
		<slot name="header" v-if="needHeader">
			<div class="__calendar__header">
				<div class="__header__pre" @click="handlePreMonth"></div>
				<div class="__header__title">
				{{ selectedYear }}年{{ selectedMonth + 1 }}月{{ selectedDate }}日
				</div>
				<div class="__header__next" @click="handleNextMonth"></div>
			</div>
		</slot>

		<div class="__calendar__main">
			<div
				class="__main__block-head"
				:style="{ height: blockHeight }"
				v-for="(item, index) in calendarHeader"
				:key="index"
			>
				{{ item }}
			</div>

			<div
				:style="{ height: blockHeight }"
				:class="[
					'__main__block',
					`__main__block-${calendarID}`,
					item.type === 'pre' || item.type === 'next' ? '__main__block-not' : '',
					item.content === selectedDate && item.type === 'normal' ? '__main__block-today' : '',
					isToday(item) ? 'today-border' : ''
				]"
				@click="handleDayClick(item)"
				v-for="(item, index) in (outerCalendarData[selectedMonth] || calendarData[selectedMonth])"
				:key="item.type + item.content + `${index}`"
			>
				{{ item.content }}
			</div>
		</div>
	</div>
</template>
  
<script scoped>
import { getAllDaysForYear, getFormatTime } from '@mykurisu/calendar-core';
  
export default {
	props: {
	  targetDate: String,
	  targetTimestamp: Number,
	  needHeader: {
		type: Boolean,
		default: true
	  },
	  outerCalendarData: {
		type: Array,
		default: function() {
		  return []
		}
	  }
	},
	data() {
	  return {
		calendarID: Date.now(),
		calendarInit: false,
		calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
		calendarData: [],
		blockHeight: "40px",
		selectedYear: 2013,
		selectedMonth: 9,
		selectedDate: 30
	  }
	},
	computed: {
	  isFirstMonth() {
		return this.selectedMonth === 0
	  },
	  isLastMonth() {
		return this.selectedMonth === 11
	  },
	  today() {
		const today = new Date()
		return {
		  year: today.getFullYear(),
		  month: today.getMonth(),
		  date: today.getDate()
		}
      }
	},
	mounted() {
    this.init();
  },
	methods: {
		init() {
			const initDate = this.targetDate || getFormatTime(this.targetTimestamp || Date.now())
			const [ year, month, date ] = initDate.split('/')
			this.selectedYear = Number(year)
			this.selectedMonth = Number(month) - 1
			this.selectedDate = Number(date)
			this.calendarData = getAllDaysForYear(Number(year));
			this.$emit('fetchCalendar', { calendar: this.calendarData })
			this.calendarInit = true
	  	},
  
	  	handleDayClick(item) {
			if (item.type === "normal") {
			this.selectedDate = Number(item.content);
			this.$emit('selectDate', { date: `${this.selectedYear}/${this.selectedMonth + 1}/${this.selectedDate}` })
			}
	  },

    updateBlockHeight() {
      this.blockHeight = document.querySelector(`.__main__block-${this.calendarID}`).offsetWidth + "px";
    },
  
	 	handlePreMonth() {
			if (this.isFirstMonth) {
			this.selectedYear = this.selectedYear - 1
			this.calendarData = getAllDaysForYear(Number(this.selectedYear))
			}
			this.selectedDate = 1
			this.selectedMonth = this.isFirstMonth ? 11 : this.selectedMonth - 1
			this.$emit('preMonth', { month: this.selectedMonth })
	  	},
  
	  	handleNextMonth() {
			if (this.isLastMonth) {
			this.selectedYear = this.selectedYear + 1
			this.calendarData = getAllDaysForYear(Number(this.selectedYear))
			}
			this.selectedDate = 1
			this.selectedMonth = this.isLastMonth ? 0 : this.selectedMonth + 1
			this.$emit('nextMonth', { month: this.selectedMonth })
	  	},

	  	isToday(item) {
			return (
				this.today.year === this.selectedYear &&
				this.today.month === this.selectedMonth &&
				this.today.date === Number(item.content) &&
				item.type === 'normal'
			)
		}
	},
  beforeDestroy() {
    window.removeEventListener('resize', this.updateBlockHeight);
  }
}
</script>

<style scoped>
.__calendar {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    background-color: white;
    user-select: none;
}

.__calendar__header {
    color: #2c3135;
    font-size: 16px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 22px;
    margin: 17px 0;
}

.__header__title {
    font-size: 16px;
    letter-spacing: 1px;
}

.__header__pre {
    height: 12px;
    width: 12px;
    position: relative;
}

.__header__pre::after {
    content: " ";
    display: inline-block;
    height: 9px;
    width: 9px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(180deg);
    position: absolute;
    top: 50%;
    margin-top: -4px;
    left: 10px;
}

.__header__next {
    height: 12px;
    width: 12px;
    position: relative;
}

.__header__next::after {
    content: " ";
    display: inline-block;
    height: 9px;
    width: 9px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    margin-top: -4px;
    left: -10px;
}

.__calendar__main {
    width: 100%;
    height: calc(100% - 22px);
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.__main__block {
    width: calc(100% / 7);
    margin-bottom: 15px;
    border-radius: 2px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    background-color: #fff;
    flex-shrink: 0;
    box-shadow: 0;
    position: relative;
}

.__main__block-piont {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #52b7f5;
    position: absolute;
    left: calc(50% - 2.5px);
    bottom: 0;
}

.__main__block-not {
    background-color: #edf2f5;
    color: #7f8fa4;
}

.__main__block-today {
    transition: 0.5s all;
    background-color: #52b7f5;
    color: #fff;
    box-shadow: 0 2px 6px rgba(171, 171, 171, 0.5);
}

.__main__block-head {
    width: calc(100% / 7);
    margin-bottom: 15px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #52b7f5;
    background-color: #fff;
    flex-shrink: 0;
}

.today-border {
	border: .125rem solid #52b7f5;
	box-sizing: border-box;
}
</style>