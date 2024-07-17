package org.artchain.farmpro

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

class ShadowViewManager : ViewGroupManager<ShadowView?>() {
    @ReactProp(name = "borderTopLeftRadius", defaultInt = 0)
    fun setBorderTopLeftRadius(view: ShadowView, borderRadius: Int) {
        view.setTopLeftBorderRadius(borderRadius)
    }

    @ReactProp(name = "borderTopRightRadius", defaultInt = 0)
    fun setBorderTopRightRadius(view: ShadowView, borderRadius: Int) {
        view.setTopRightBorderRadius(borderRadius)
    }

    @ReactProp(name = "borderBottomLeftRadius", defaultInt = 0)
    fun setBorderBottomLeftRadius(view: ShadowView, borderRadius: Int) {
        view.setBottomLeftBorderRadius(borderRadius)
    }

    @ReactProp(name = "borderBottomRightRadius", defaultInt = 0)
    fun setBorderBottomRightRadius(view: ShadowView, borderRadius: Int) {
        view.setBottomRightBorderRadius(borderRadius)
    }

    @ReactProp(name = "shadowColor", customType = "Color")
    override fun setShadowColor(view: ShadowView, color: Int) {
        view.setShadowColor(color)
    }

    @ReactProp(name = "shadowRadius", defaultInt = 0)
    fun setShadowRadius(view: ShadowView, radius: Int) {
        view.setShadowRadius(radius)
    }

    @ReactProp(name = "spreadRadius", defaultInt = 0)
    fun setSpreadRadius(view: ShadowView, radius: Int) {
        view.setSpreadRadius(radius)
    }

    @ReactProp(name = "offsetX", defaultInt = 0)
    fun setOffsetX(view: ShadowView, x: Int) {
        view.setOffsetX(x)
    }

    @ReactProp(name = "offsetY", defaultInt = 0)
    fun setOffsetY(view: ShadowView, y: Int) {
        view.setOffsetY(y)
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(context: ThemedReactContext): ShadowView {
        return ShadowView(context)
    }

    companion object {
        const val REACT_CLASS: String = "ShadowView"
    }
}