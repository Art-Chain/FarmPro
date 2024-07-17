package org.artchain.farmpro

import android.content.Context
import android.graphics.BlurMaskFilter
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Path
import android.view.ViewGroup

class ShadowView(context: Context?) : ViewGroup(context) {
    private val paint: Paint

    private val borderRadius = intArrayOf(0, 0, 0, 0)
    private val offset = intArrayOf(0, 0)
    private var shadowColor: Int
    private var shadowRadius = 0
    private var spreadRadius = 0

    private var childWidth = 0
    private var childHeight = 0
    private val path: Path

    init {
        this.shadowColor = Color.parseColor("#ff0000")
        this.path = Path()

        this.paint = Paint(Paint.ANTI_ALIAS_FLAG)
        paint.style = Paint.Style.FILL

        this.setWillNotDraw(false)
    }

    fun setShadowColor(shadowColor: Int) {
        this.shadowColor = shadowColor
        this.invalidate()
    }

    fun setShadowRadius(shadowRadius: Int) {
        this.shadowRadius = shadowRadius
        if (shadowRadius > 0) paint.setMaskFilter(
            BlurMaskFilter(
                this.shadowRadius.toFloat(),
                BlurMaskFilter.Blur.NORMAL
            )
        )
        else paint.setMaskFilter(null)

        this.invalidate()
    }

    fun setTopLeftBorderRadius(tl: Int) {
        this.setBorderRadius(
            tl,
            borderRadius[1], borderRadius[2], borderRadius[3]
        )
    }

    fun setTopRightBorderRadius(tr: Int) {
        this.setBorderRadius(
            borderRadius[0], tr,
            borderRadius[2], borderRadius[3]
        )
    }

    fun setBottomLeftBorderRadius(bl: Int) {
        this.setBorderRadius(
            borderRadius[0],
            borderRadius[1], bl, borderRadius[3]
        )
    }

    fun setBottomRightBorderRadius(br: Int) {
        this.setBorderRadius(
            borderRadius[0],
            borderRadius[1], borderRadius[2], br
        )
    }

    fun setBorderRadius(tl: Int, tr: Int, bl: Int, br: Int) {
        this.setBorderRadius(intArrayOf(tl, tr, bl, br))
    }

    fun setBorderRadius(borderRadius: IntArray) {
        this.borderRadius[0] = borderRadius[0]
        this.borderRadius[1] = borderRadius[1]
        this.borderRadius[2] = borderRadius[2]
        this.borderRadius[3] = borderRadius[3]

        this.invalidate()
    }

    fun setOffsetX(x: Int) {
        this.setOffset(x, offset[1])
    }

    fun setOffsetY(y: Int) {
        this.setOffset(offset[0], y)
    }

    fun setOffset(x: Int, y: Int) {
        this.setOffset(intArrayOf(x, y))
    }

    fun setOffset(offset: IntArray) {
        this.offset[0] = offset[0]
        this.offset[1] = offset[1]

        this.invalidate()
    }

    fun setSpreadRadius(spreadRadius: Int) {
        this.spreadRadius = spreadRadius
        this.invalidate()
    }

    fun getShadowColor(): Int {
        return shadowColor
    }

    fun getShadowRadius(): Int {
        return shadowRadius
    }

    fun getBorderRadius(): IntArray {
        return intArrayOf(borderRadius[0], borderRadius[1], borderRadius[2], borderRadius[3])
    }

    fun getOffset(): IntArray {
        return intArrayOf(offset[0], offset[1])
    }

    fun getSpreadRadius(): Int {
        return spreadRadius
    }

    private fun drawPath(left: Int, top: Int, right: Int, bottom: Int) {
        path.moveTo((left + borderRadius[0]).toFloat(), top.toFloat())
        path.lineTo((right - borderRadius[1]).toFloat(), top.toFloat())
        path.cubicTo(
            (right - borderRadius[1]).toFloat(),
            top.toFloat(),
            right.toFloat(),
            top.toFloat(),
            right.toFloat(),
            (top + borderRadius[1]).toFloat()
        )
        path.lineTo(right.toFloat(), (bottom - borderRadius[3]).toFloat())
        path.cubicTo(
            right.toFloat(),
            (bottom - borderRadius[3]).toFloat(),
            right.toFloat(),
            bottom.toFloat(),
            (right - borderRadius[3]).toFloat(),
            bottom.toFloat()
        )
        path.lineTo((left + borderRadius[2]).toFloat(), bottom.toFloat())
        path.cubicTo(
            (left + borderRadius[2]).toFloat(),
            bottom.toFloat(),
            left.toFloat(),
            bottom.toFloat(),
            left.toFloat(),
            (bottom - borderRadius[2]).toFloat()
        )
        path.lineTo(left.toFloat(), (top + borderRadius[0]).toFloat())
        path.cubicTo(
            left.toFloat(),
            (top + borderRadius[0]).toFloat(),
            left.toFloat(),
            top.toFloat(),
            (left + borderRadius[0]).toFloat(),
            top.toFloat()
        )
        path.close()
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        this.measureChildren(widthMeasureSpec, heightMeasureSpec)

        val child = this.getChildAt(0)

        this.childWidth = child?.measuredWidth ?: 0
        this.childHeight = child?.measuredHeight ?: 0

        this.setMeasuredDimension(
            this.childWidth + (this.spreadRadius * 2) + this.shadowRadius,
            this.childHeight + (this.spreadRadius * 2) + this.shadowRadius
        )
    }

    override fun onDraw(canvas: Canvas) {
        paint.color = shadowColor

        val x = offset[0]
        val y = offset[1]

        path.reset()
        this.drawPath(
            x - spreadRadius,
            y - spreadRadius,
            this.childWidth + spreadRadius + x,
            this.childHeight + spreadRadius + y
        )
        canvas.drawPath(this.path, this.paint)

        super.onDraw(canvas)
    }

    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
        this.getChildAt(0)?.let {
            it.layout(0, 0, it.measuredWidth, it.measuredHeight)
        }
    }
}